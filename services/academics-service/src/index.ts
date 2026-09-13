import express from 'express';
import { PrismaClient } from './generated/client';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
import { redisPub } from './lib/redis';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;
const SIS_SERVICE_URL = process.env.SIS_SERVICE_URL || 'http://sis-service:3002';

// Middleware to extract user from gateway headers
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];
  if (!userId || !userRole) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // @ts-ignore
  req.user = { id: userId, role: userRole };
  next();
};

app.use(requireAuth);

const subjectSchema = z.object({
  syllabusCode: z.string(),
  name: z.string(),
  level: z.enum(['IGCSE', 'A_LEVEL'])
});

app.post('/api/v1/academics/subjects', async (req, res) => {
  try {
    const data = subjectSchema.parse(req.body);
    const subject = await prisma.subject.create({ data });
    res.json(subject);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/api/v1/academics/subjects', async (req, res) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
});

const classSubjectSchema = z.object({
  classId: z.string(),
  subjectId: z.string(),
  teacherAuthUserId: z.string()
});

app.post('/api/v1/academics/class-subjects', async (req, res) => {
  try {
    const data = classSubjectSchema.parse(req.body);
    // Mock SIS check here since we don't have the full HTTP call set up yet for internal
    const classSubject = await prisma.classSubject.create({ data });
    res.json(classSubject);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/api/v1/academics/class-subjects', async (req, res) => {
  const classSubjects = await prisma.classSubject.findMany({
    include: { subject: true }
  });
  res.json(classSubjects);
});

const attendanceSchema = z.object({
  timetableSlotId: z.string(),
  date: z.string(),
  records: z.array(z.object({
    studentId: z.string(),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'])
  }))
});

app.post('/api/v1/academics/attendance', async (req, res) => {
  try {
    const { timetableSlotId, date, records } = attendanceSchema.parse(req.body);
    // @ts-ignore
    const teacherId = req.user.id;
    
    // Check if slot exists and teacher teaches it
    const slot = await prisma.timetableSlot.findUnique({
      where: { id: timetableSlotId },
      include: { classSubject: true }
    });
    
    // @ts-ignore
    if (!slot || (req.user.role === 'TEACHER' && slot.classSubject.teacherAuthUserId !== teacherId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const createdRecords = await prisma.$transaction(
      records.map(r => prisma.attendanceRecord.create({
        data: {
          studentId: r.studentId,
          timetableSlotId,
          date: new Date(date),
          status: r.status,
          recordedBy: teacherId
        }
      }))
    );

    // Publish event to Redis (attendance.recorded)
    await redisPub.publish('academics.events', JSON.stringify({
      type: 'attendance.recorded',
      payload: {
        timetableSlotId,
        date,
        count: createdRecords.length,
        recordedBy: teacherId
      },
      timestamp: new Date().toISOString()
    }));
    
    res.json({ message: 'Attendance recorded', count: createdRecords.length });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input or student already recorded' });
  }
});

app.get('/api/v1/academics/attendance', async (req, res) => {
  const { timetableSlotId, date } = req.query;
  const where: any = {};
  if (timetableSlotId) where.timetableSlotId = String(timetableSlotId);
  if (date) where.date = new Date(String(date));
  
  const records = await prisma.attendanceRecord.findMany({ where });
  res.json(records);
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'academics-service' }));

app.listen(PORT, () => {
  console.log(`Academics service listening on port ${PORT}`);
});
