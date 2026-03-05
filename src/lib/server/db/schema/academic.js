import { mysqlTable, serial, varchar, boolean, bigint, int } from 'drizzle-orm/mysql-core';

import { usersTable } from './user';

export const academicsTable = mysqlTable('academics_table', {
	id: serial('id').primaryKey(),
	school: varchar('school', { length: 255 }).notNull(),
	address: varchar('address', { length: 255 }).notNull(),
	degree: varchar('degree', { length: 255 }),
	major: varchar('major', { length: 255 }),
	level: varchar('level', { length: 255 }).notNull(),
	academicYear: varchar('academic_year', { length: 255 }).notNull(),
	ongoing: boolean('ongoing').notNull().default(false),
	userId: bigint('user_id', { unsigned: true })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});
