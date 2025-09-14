import 'dotenv/config';

export default {
  out: './drizzel',
  schema: './src/models/*.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
