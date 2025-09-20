import {
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from '#src/controllers/users.controller.js';
import {
  authenticateToken,
  requireRole,
} from '#src/middleware/auth.middleware.js';
import express from 'express';

const routes = express.Router();

routes.get('/', authenticateToken, fetchAllUsers);
routes.get('/:id', authenticateToken, fetchUserById);
routes.put('/:id', authenticateToken, updateUserById);

routes.delete(
  '/:id',
  authenticateToken,
  requireRole(['admin']),
  deleteUserById
);

export default routes;
