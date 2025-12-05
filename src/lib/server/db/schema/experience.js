import { mysqlTable, serial, varchar, boolean, bigint } from 'drizzle-orm/mysql-core';

import { usersTable } from './user';

export const experiencesTable = mysqlTable('experiences_table', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	description: varchar('description', { length: 1024 }).notNull(),
	current: boolean('current').notNull().default(false),
	userId: bigint('user_id', { unsigned: true })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});
