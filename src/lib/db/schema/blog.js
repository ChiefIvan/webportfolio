import { mysqlTable, serial, varchar, boolean, timestamp, bigint } from 'drizzle-orm/mysql-core';
import { usersTable } from './user';

export const blogsTable = mysqlTable('blogs_table', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => new Date()),
	published: boolean('published').notNull().default(false),
	userId: bigint('user_id', { unsigned: true })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});
