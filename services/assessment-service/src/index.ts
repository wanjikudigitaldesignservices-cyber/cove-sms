import express from 'express';
import { PrismaClient } from './generated/client';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3004;

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

const componentSchema = z.object({
  subjectId: z.string(),
  name: z.string(),
  weightingPercent: z.number().min(0).max(100),
  term: z.string()
});

app.post('/api/v1/assessment/components', async (req, res) => {
  try {
    const data = componentSchema.parse(req.body);
    const existing = await prisma.assessmentComponent.findMany({
      where: { subjectId: data.subjectId, term: data.term }
    });
    const totalWeight = existing.reduce((sum, c) => sum + c.weightingPercent, 0) + data.weightingPercent;
    
    if (totalWeight > 100) {
      return res.status(400).json({ error: 'Total weighting for term cannot exceed 100%' });
    }

    const component = await prisma.assessmentComponent.create({ data });
    res.json(component);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

const computeSchema = z.object({
  subjectId: z.string(),
  term: z.string(),
  studentId: z.string()
});

app.post('/api/v1/assessment/grades/compute', async (req, res) => {
  try {
    const { subjectId, term, studentId } = computeSchema.parse(req.body);
    // Fetch all components and scores for this student+subject+term
    const components = await prisma.assessmentComponent.findMany({
      where: { subjectId, term },
      include: { scores: { where: { studentId, term } } }
    });

    let totalPercentage = 0;
    for (const comp of components) {
      if (comp.scores.length > 0) {
        const score = comp.scores[0];
        const percentage = (score.rawScore / score.maxScore) * comp.weightingPercent;
        totalPercentage += percentage;
      }
    }

    // Dummy boundary lookup for now
    let letterGrade = 'U';
    if (totalPercentage >= 90) letterGrade = 'A*';
    else if (totalPercentage >= 80) letterGrade = 'A';
    else if (totalPercentage >= 70) letterGrade = 'B';
    else if (totalPercentage >= 60) letterGrade = 'C';

    const computed = await prisma.computedGrade.upsert({
      where: {
        studentId_subjectId_term: { studentId, subjectId, term }
      },
      update: {
        weightedPercentage: totalPercentage,
        letterGrade
      },
      create: {
        studentId, subjectId, term,
        weightedPercentage: totalPercentage,
        letterGrade
      }
    });

    res.json(computed);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Compute failed' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'assessment-service' }));

app.listen(PORT, () => {
  console.log(`Assessment service listening on port ${PORT}`);
});
