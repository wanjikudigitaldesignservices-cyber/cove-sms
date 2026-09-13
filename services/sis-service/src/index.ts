import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from './generated/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

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

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(),
  gender: z.string(),
  yearGroup: z.string(),
  admissionNumber: z.string()
});

app.post('/api/v1/students', async (req, res) => {
  try {
    const data = studentSchema.parse(req.body);
    const student = await prisma.student.create({
      data: {
        ...data,
        dob: new Date(data.dob),
      }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/api/v1/students', async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

const classSchema = z.object({
  yearGroup: z.string(),
  section: z.string(),
  academicYear: z.string()
});

app.post('/api/v1/classes', async (req, res) => {
  try {
    const data = classSchema.parse(req.body);
    const newClass = await prisma.class.create({ data });
    res.json(newClass);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/api/v1/classes', async (req, res) => {
  const classes = await prisma.class.findMany();
  res.json(classes);
});

const enrollmentSchema = z.object({
  studentId: z.string(),
  classId: z.string(),
  term: z.string()
});

app.post('/api/v1/enrollments', async (req, res) => {
  try {
    const data = enrollmentSchema.parse(req.body);
    const enrollment = await prisma.enrollment.create({ data });
    res.json(enrollment);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'sis-service' }));

app.listen(PORT, () => {
  console.log(`SIS service listening on port ${PORT}`);
});
