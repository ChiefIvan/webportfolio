import { mysqlTable, serial, varchar, boolean, bigint } from 'drizzle-orm/mysql-core';

import { usersTable } from './user';

export const academicsTable = mysqlTable('academics_table', {
	id: serial('id').primaryKey(),
	level: varchar('level', { length: 255 }).notNull(),
	degree: varchar('degree', { length: 255 }).notNull(),
	school: varchar('school', { length: 255 }).notNull(),
	address: varchar('address', { length: 255 }).notNull(),
	academicYear: varchar('academic_year', { length: 255 }).notNull(),
	current: boolean('current').notNull().default(false),
	userId: bigint('user_id', { unsigned: true })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});
