import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { ADMIN_EMAIL } from '$env/static/private';
import { usersTable, academicsTable } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

const { error } = console;

export const actions = {
	saveProfile: async ({ request, locals }) => {
		const session = await locals.getSession();
		const sessionUser = session.user;

		if (!sessionUser) {
			return { success: false, error: 'Not logged in' };
		}

		const data = await request.formData();

		const name = data.get('Name')?.toString();
		const alias = data.get('Alias')?.toString();
		const bio = data.get('Let others know more about you...')?.toString();

		try {
			await db
				.update(usersTable)
				.set({ name, alias, bio })
				.where(eq(usersTable.email, ADMIN_EMAIL));

			return { success: true };
		} catch (e) {
			error('Upsert failed:', e);
			return fail(500, { success: false, error: 'Failed to save profile!' });
		}
	},
	saveAcdemicInfo: async ({ request, locals }) => {
		const session = await locals.getSession();
		const sessionUser = session.user;

		if (!sessionUser) {
			return { success: false, error: 'Not logged in' };
		}

		const data = await request.formData();
		const id = parseInt(data.get('id'));
		const school = data.get('School')?.toString();
		const address = data.get('Address')?.toString();
		const degree = data.get('Degree (Optional)')?.toString();
		const major = data.get('Major (Optional)')?.toString();
		const level = data.get('level')?.toString();
		const academicYear = data.get('academicYear')?.toString();
		const ongoing = data.get('On-Going')?.toString() === 'on';

		try {
			const user = await db.query.usersTable.findFirst({
				where: eq(usersTable.email, ADMIN_EMAIL)
			});

			if (!user) {
				return fail(404, { success: false, error: 'User not found!' });
			}

			const result = await db
				.insert(academicsTable)
				.values({
					id,
					school,
					address,
					degree,
					major,
					level,
					academicYear,
					ongoing,
					userId: user.id
				})
				.onDuplicateKeyUpdate({
					set: {
						school,
						address,
						degree,
						major,
						level,
						academicYear,
						ongoing
					}
				});

			const updated = await db.query.academicsTable.findFirst({
				where: eq(academicsTable.id, result[0].insertId)
			});

			return { success: true, updated };
		} catch (e) {
			error('Insert failed:', e);
			return fail(500, { success: false, error: 'Failed to save academic data!' });
		}
	},
	deleteAcademic: async ({ request, locals }) => {
		const session = await locals.getSession();
		const sessionUser = session.user;

		if (!sessionUser) {
			return { success: false, error: 'Not logged in' };
		}

		const data = await request.formData();
		const id = parseInt(data.get('id'));

		try {
			// console.log(academicsTable.id == id);
			await db.delete(academicsTable).where(eq(academicsTable.id, id)).limit(1);
			return { success: true, id };
		} catch (e) {
			error('Delete failed:', e);
			return fail(500, { success: false, error: 'Failed to delete academic data!' });
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

		const academics = await db
			.select()
			.from(academicsTable)
			.where(eq(academicsTable.userId, user.id));

		user.academics = academics;

		return { user };
	} catch (e) {
		error('Fetch failed:', e);
		return { success: false, error: 'Failed to fetch user data!' };
	}
};
