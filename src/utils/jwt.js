import jwt from 'jsonwebtoken';
import { logger } from '#config/logger.js';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, process.env.JWT_SECERT, { expiresIn: '1d' });
    } catch (error) {
      logger.error('Failed to create token ', error);
      throw new Error('Failed to create token');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, process.env.JWT_SECERT);
    } catch (error) {
      logger.error('Failed to authenticate token', error);
      throw new Error('Failed to authenticate token');
    }
  },
};
