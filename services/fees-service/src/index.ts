import express from 'express';
import { PrismaClient } from './generated/client';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

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

const generateInvoiceSchema = z.object({
  feeStructureId: z.string(),
  studentIds: z.array(z.string()) // In a real flow, calls SIS to get this
});

app.post('/api/v1/fees/invoices/generate', async (req, res) => {
  try {
    const { feeStructureId, studentIds } = generateInvoiceSchema.parse(req.body);
    
    // @ts-ignore
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const structure = await prisma.feeStructure.findUnique({ where: { id: feeStructureId } });
    if (!structure) {
      return res.status(404).json({ error: 'Fee structure not found' });
    }

    const invoices = await prisma.$transaction(
      studentIds.map(studentId => prisma.invoice.create({
        data: {
          studentId,
          feeStructureId,
          term: structure.term,
          amountDue: structure.amount,
          amountPaid: 0,
          status: 'ISSUED'
        }
      }))
    );
    
    res.json({ message: 'Invoices generated', count: invoices.length });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

const paymentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().positive()
});

app.post('/api/v1/fees/payments', async (req, res) => {
  try {
    const { invoiceId, amount } = paymentSchema.parse(req.body);
    
    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    // Mock Provider Integration (Phase 5) -> IntaSend in Phase 8
    const providerReference = `MOCK-TXN-${Date.now()}`;

    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        provider: process.env.PAYMENT_PROVIDER || 'mock',
        providerReference,
        amount,
        status: 'PENDING'
      }
    });

    res.json({ payment, checkoutUrl: `http://mock-provider.local/pay/${providerReference}` });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

const confirmSchema = z.object({
  providerReference: z.string(),
  status: z.enum(['SUCCESS', 'FAILED'])
});

app.post('/api/v1/fees/payments/confirm', async (req, res) => {
  try {
    const { providerReference, status } = confirmSchema.parse(req.body);

    const payment = await prisma.payment.findUnique({ where: { providerReference }, include: { invoice: true } });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    if (payment.status === 'CONFIRMED') {
      return res.json({ message: 'Already confirmed - idempotent' });
    }

    if (status === 'SUCCESS') {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'CONFIRMED' }
        }),
        prisma.invoice.update({
          where: { id: payment.invoiceId },
          data: { 
            amountPaid: payment.invoice.amountPaid + payment.amount,
            status: (payment.invoice.amountPaid + payment.amount) >= payment.invoice.amountDue ? 'PAID' : 'PARTIALLY_PAID'
          }
        })
      ]);
      // TODO: Publish invoice.paid event
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' }
      });
    }

    res.json({ message: 'Payment processed' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'fees-service' }));

app.listen(PORT, () => {
  console.log(`Fees service listening on port ${PORT}`);
});
