import express from 'express';
import { PrismaClient } from './generated/client';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3006;

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

const templateSchema = z.object({
  eventType: z.string(),
  subjectTemplate: z.string(),
  bodyTemplate: z.string(),
  channel: z.string().default('EMAIL')
});

app.post('/api/v1/comms/templates', async (req, res) => {
  try {
    // @ts-ignore
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
    
    const data = templateSchema.parse(req.body);
    const template = await prisma.notificationTemplate.upsert({
      where: { eventType: data.eventType },
      update: data,
      create: data
    });
    res.json(template);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/api/v1/comms/templates', async (req, res) => {
  // @ts-ignore
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
  const templates = await prisma.notificationTemplate.findMany();
  res.json(templates);
});

// Notifications should ideally be consumed from Redis.
// Providing a manual endpoint here for testing.
const notifySchema = z.object({
  eventId: z.string(),
  eventType: z.string(),
  recipientRef: z.string()
});

app.post('/api/v1/comms/notifications', async (req, res) => {
  try {
    // @ts-ignore
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });

    const { eventId, eventType, recipientRef } = notifySchema.parse(req.body);
    const template = await prisma.notificationTemplate.findUnique({ where: { eventType } });
    
    if (!template) return res.status(404).json({ error: 'Template not found' });

    // Idempotency check via unique constraint
    try {
      const log = await prisma.notificationLog.create({
        data: {
          eventId,
          eventType,
          recipientRef,
          channel: template.channel,
          status: 'SENT' // Mock sent
        }
      });
      res.json(log);
    } catch (e: any) {
      if (e.code === 'P2002') {
        return res.json({ message: 'Event already processed' });
      }
      throw e;
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'comms-service' }));

app.listen(PORT, () => {
  console.log(`Comms service listening on port ${PORT}`);
});
