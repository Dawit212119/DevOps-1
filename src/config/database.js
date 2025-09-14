import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

import { drizzel } from 'drizzle-orm/neon-http';
const sql = neon(process.env.DATABASE_URL);

const db = drizzel(sql);

export { db, sql };
