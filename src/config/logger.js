import winston from 'winston';
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    (winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json())
  ),
  defaultMeta: {
    service: 'DevOps-api',
  },
  transports: [
    new winston.transports.File({ filename: 'logs/error.lg', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.lg' }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        (winston.format.simple(), winston.format.colorize())
      ),
    })
  );
}
