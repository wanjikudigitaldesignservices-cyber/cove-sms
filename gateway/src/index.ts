import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api/v1/auth')) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.headers['x-user-id'] = decoded.userId;
    req.headers['x-user-role'] = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.use(verifyToken);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'gateway' }));

// Auth Service proxy
app.use('/api/v1/auth', createProxyMiddleware({ target: 'http://auth-service:3001', changeOrigin: true } as any));

// SIS Service proxy
app.use('/api/v1/students', createProxyMiddleware({ target: 'http://sis-service:3002', changeOrigin: true } as any));
app.use('/api/v1/classes', createProxyMiddleware({ target: 'http://sis-service:3002', changeOrigin: true } as any));
app.use('/api/v1/enrollments', createProxyMiddleware({ target: 'http://sis-service:3002', changeOrigin: true } as any));

// Academics Service proxy
app.use('/api/v1/academics', createProxyMiddleware({ target: 'http://academics-service:3003', changeOrigin: true } as any));

// Assessment Service proxy
app.use('/api/v1/assessment', createProxyMiddleware({ target: 'http://assessment-service:3004', changeOrigin: true } as any));

// Fees Service proxy
app.use('/api/v1/fees', createProxyMiddleware({ target: 'http://fees-service:3005', changeOrigin: true } as any));

// Comms Service proxy
app.use('/api/v1/comms', createProxyMiddleware({ target: 'http://comms-service:3006', changeOrigin: true } as any));

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
