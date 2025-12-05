import { mysqlTable, serial, varchar, bigint } from 'drizzle-orm/mysql-core';

import { usersTable } from './user';

export const projectsTable = mysqlTable('projects_table', {
	id: serial().primaryKey(),
	img: varchar({ length: 255 }),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 1024 }).notNull(),
	link: varchar({ length: 255 }),
	github: varchar({ length: 255 }),
	userId: bigint('user_id', { unsigned: true })
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});
