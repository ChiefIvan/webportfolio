import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { usersTable } from '$src/lib/server/db/schema';
import { ADMIN_EMAIL } from '$env/static/private';

const { error } = console;

export const load = async ({ params }) => {
	try {
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, ADMIN_EMAIL))
			.limit(1);

		return { user };
	} catch (e) {
		error('Fetch failed:', e);
		return { success: false, error: 'Failed to fetch user data!' };
	}
};
