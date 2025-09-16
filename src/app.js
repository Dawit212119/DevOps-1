import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from '#config/logger.js';
import authRoute from '#routes/auth.route.js';
// import securityMiddleware from './middleware/security.middleware';
const app = express();
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);
// app.use(securityMiddleware);
app.get('/health', (req, res) => {
  logger.info('health');
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.get('/', (req, res) => {
  logger.info('hello from devops-1');
  res.send('yoo');
});
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Devops API is running!',
  });
});
app.use('/api/auth', authRoute);
(app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
}),
app.use((err, req, res, _next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: `Server error: ${err.message}` });
}));

export default app;
