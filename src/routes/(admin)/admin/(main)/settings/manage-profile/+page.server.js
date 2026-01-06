import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { ADMIN_EMAIL } from '$env/static/private';
import { usersTable } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.getSession();
		const sessionUser = session.user;

		if (!sessionUser) {
			return { success: false, error: 'Not logged in' };
		}

		const data = await request.formData();

		const email = data.get('email')?.toString();
		const name = data.get('Name')?.toString();
		const alias = data.get('Alias')?.toString();
		const bio = data.get('Let others know more about you...')?.toString();

		try {
			await db
				.update(usersTable)
				.set({ name, alias, bio })
				.where(eq(usersTable.email, ADMIN_EMAIL));

			return { success: true };
		} catch (error) {
			console.error('Upsert failed:', error);
			return fail(500, { success: false, error: 'Failed to save profile!' });
		}
	}
};

export const load = async ({ params, locals }) => {
	const session = await locals.auth();
	const sessionUser = session.user;

	if (!sessionUser.email) {
		return { success: false, error: 'Not logged in' };
	}

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
