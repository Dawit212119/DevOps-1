import { logger } from '#src/config/logger.js';
import { eq } from 'drizzle-orm';
import { user } from '#src/models/user.model.js';
import { db } from '#src/config/database.js';
export const getAllUsers = async () => {
  try {
    return await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .from(user);
  } catch (e) {
    logger.error('Error getting users', e);
    throw e;
  }
};

export const getUserById = async id => {
  try {
    const [user] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (e) {
    logger.error(`Error getting user by id: ${id}`, e);
    throw e;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const existingUser = await getUserById(id);
    if (updates.email && updates.email !== existingUser.email) {
      const [emailExists] = await db
        .select()
        .from(user)
        .where(eq(user.email, updates.email))
        .limit(1);
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }
    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    const updatedUser = await db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id))
      .returning({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    logger.info(`User ${updateUser.email} updatef successfully`);
    return updatedUser;
  } catch (e) {
    logger.error(`Error updating user ${id}:`, e);
    throw e;
  }
};

export const deleteUser = async id => {
  try {
    await getUserById(id);

    const deletedUser = await db.delete(user).where(eq(user.id, id)).returning({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    logger.info('User deleted successfully');
    return deletedUser;
  } catch (e) {
    logger.error(`Error deleting user ${id}`, e);
    throw e;
  }
};
