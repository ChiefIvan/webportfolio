import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { usersTable } from '$src/lib/server/db/schema';
import { ADMIN_EMAIL } from '$env/static/private';

export const load = async ({ params }) => {
	try {
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, ADMIN_EMAIL))
			.limit(1);

		return { user };
	} catch (error) {
		console.error('Fetch failed:', error);
		return { success: false, error: 'Failed to fetch user data!' };
	}
};
