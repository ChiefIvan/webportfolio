import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ivan1234',
  database: 'mydb'
});

const db = drizzle(connection);

await migrate(db, {
  migrationsFolder: 'drizzle'
});

await connection.end();