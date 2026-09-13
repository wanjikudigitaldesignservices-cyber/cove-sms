import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from './generated/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    
    if (!user || !user.passwordHash || user.status !== 'ACTIVE') {
      return res.status(401).json({ error: 'Invalid credentials or inactive account' });
    }
    
    const match = await bcrypt.compare(data.password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Seed endpoint for testing
app.post('/api/v1/auth/seed', async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'admin@cove.edu' },
      update: {},
      create: {
        email: 'admin@cove.edu',
        passwordHash,
        role: 'ADMIN',
        status: 'ACTIVE'
      }
    });
    res.json({ message: 'Seeded admin@cove.edu / password123', user });
  } catch (error) {
    res.status(500).json({ error: 'Seed failed' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'auth-service' }));

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
