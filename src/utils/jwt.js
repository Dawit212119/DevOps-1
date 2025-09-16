import jwt from 'jsonwebtoken';
import { logger } from '#config/logger.js';
import 'dotenv/config';
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT secret is not defined in environment variables');
}
export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, secret, { expiresIn: '1d' });
    } catch (error) {
      logger.error('Failed to create token ', error);
      throw new Error('Failed to create token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      logger.error('Failed to authenticate token', error);
      throw new Error('Failed to authenticate token');
    }
  },
};
