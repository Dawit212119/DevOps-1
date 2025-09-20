import request from 'supertest';
import app from '#src/app.js';
import { db } from '#src/config/database.js';
beforeEach(async () => {
  console.log('connecting to db', process.env.DATABASE_URL);
});
afterAll(async () => {
  if (db.$pool) {
    await db.$pool.end();
  }
});
describe('API EndPoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('uptime');
    });
  });
  describe('GET /api', () => {
    it('should return API message', async () => {
      const response = await request(app).get('/api').expect(200);
      expect(response.body).toHaveProperty('message', 'Devops API is running!');
    });
  });
  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/noneexistent').expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
  describe('POST /api/auth/sign-up', () => {
    it('should return users object', async () => {
      const response = await request(app)
        .post('/api/auth/sign-up')
        .send({
          name: 'Dawit Workye',
          email: 'test1@example.com',
          password: 'Password123!',
        })
        .expect(201);

      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('name', 'Dawit Workye');
      expect(response.body.user).toHaveProperty('email', 'test1@example.com');
      expect(response.body.user).toHaveProperty('createdAt');
      expect(response.body.user).toHaveProperty('role');
    });
  });
  describe('POST /api/auth/sign-in', () => {
    it('should log in an existing user', async () => {
      const res = await request(app)
        .post('/api/auth/sign-in')
        .send({
          email: 'test1@example.com',
          password: 'Password123!',
        })
        .expect(200);
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('name', 'Dawit Workye');
      expect(res.body.user).toHaveProperty('email', 'test1@example.com');
      expect(res.body.user).toHaveProperty('role', 'user');
    });
  });

  describe('POST /api/auth/sign-out', () => {
    it('should logout the user', async () => {
      const res = await request(app).post('/api/auth/sign-out').expect(200);
      expect(res.body).toHaveProperty(
        'message',
        'User signed out successfully'
      );
    });
  });
});
