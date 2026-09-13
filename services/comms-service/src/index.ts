import express from 'express';
import { PrismaClient } from './generated/client';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
import { redisSub } from './lib/redis';

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
      if (e.code === 'P2002') return res.json({ message: 'Event already processed' });
      throw e;
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'comms-service' }));

// Redis Subscription Logic
redisSub.subscribe('academics.events', 'assessment.events', 'fees.events', (err, count) => {
  if (err) {
    console.error('Failed to subscribe:', err.message);
  } else {
    console.log(`Subscribed to ${count} channels.`);
  }
});

redisSub.on('message', async (channel, message) => {
  try {
    const event = JSON.parse(message);
    const eventId = `${channel}-${new Date(event.timestamp).getTime()}`;
    
    let template = await prisma.notificationTemplate.findUnique({ where: { eventType: event.type } });
    if (!template) {
      // Auto-create a default template for the event if it doesn't exist
      template = await prisma.notificationTemplate.create({
        data: {
          eventType: event.type,
          subjectTemplate: `Notification: ${event.type}`,
          bodyTemplate: `Event payload: ${JSON.stringify(event.payload)}`,
          channel: 'EMAIL'
        }
      });
    }

    // Try to create notification log (idempotent)
    await prisma.notificationLog.create({
      data: {
        eventId,
        eventType: event.type,
        recipientRef: 'auto-recipient', // In reality, we'd lookup the parent/student ID here
        channel: template.channel,
        status: 'SENT'
      }
    });
    console.log(`Processed event ${event.type}`);
  } catch (err: any) {
    if (err.code !== 'P2002') {
      console.error('Error processing event:', err);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Comms service listening on port ${PORT}`);
});
