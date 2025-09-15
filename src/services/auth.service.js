import { db } from '#config/database.js';
import { user } from '#models/user.model.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { logger } from '#config/logger.js';

export const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error(`Error hashing the password: ${error}`);
    throw new Error('Error hashing');
  }
};
export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    const existingUser = await db
      .selecte()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const password_hash = await hashPassword(password);
    const [newUser] = await db
      .insert(user)
      .values({ name, email, password: password_hash, role })
      .returning({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    logger.info(`User ${newUser.email} created successfully`);
    return newUser;
  } catch (error) {
    logger.error(`Error creating the user: ${error}`);
    throw error;
  }
};
