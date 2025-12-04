import { mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	img: varchar('img', { length: 255 }),
	name: varchar('name', { length: 255 }).notNull(),
	bio: varchar('bio', { length: 2048 }),
	createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' })
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date())
});
