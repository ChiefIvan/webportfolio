import { drizzle } from 'drizzle-orm/mysql2';

import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbURL = process.env.DATABASE_URL;

console.log('Database URL:', dbURL);

const pool = mysql.createPool(dbURL);
export const db = drizzle(pool);
