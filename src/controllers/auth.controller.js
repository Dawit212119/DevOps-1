import { logger } from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
import { cookies } from '#utils/cookies.js';
import { formatValidationError } from '#utils/format.js';
import { jwttoken } from '#utils/jwt.js';
import { signupSchema } from '#validations/auth.validation.js';

export const signup = async (req, res, next) => {
  try {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation fail',
        details: formatValidationError(validation.error),
      });
    }

    const { name, email, password, role } = validation.data;
    const user = await createUser({ name, email, role, password });
    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    cookies.set(res, 'token', token);
  } catch (error) {
    logger.error('signup error', error);
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ error: 'Email already exist' });
    }
    next(error);
  }
};
