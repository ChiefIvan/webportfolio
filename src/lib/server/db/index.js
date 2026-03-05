import { drizzle } from 'drizzle-orm/mysql2';
import { DATABASE_URL } from '$env/static/private';
import * as schema from '$lib/server/db/schema';

export const db = drizzle(DATABASE_URL, { schema, mode: 'default' });
