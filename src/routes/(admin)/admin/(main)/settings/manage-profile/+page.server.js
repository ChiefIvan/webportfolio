import { fail, redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/mysql2';
import { usersTable } from '$lib/db/schema';
import { DATABASE_URL } from '$env/static/private';

// import db from '$lib/db';

export const actions = {
	default: async ({ request, locals }) => {
		const db = drizzle(DATABASE_URL);

		const session = await locals.getSession();

		if (!session?.user?.email) {
			return { success: false, error: 'Not logged in' };
		}

		const data = await request.formData();

		const name = data.get('Name')?.toString();
		const alias = data.get('Alias')?.toString();
		const email = data.get('Email')?.toString();
		const bio = data.get('Let others know more about you...')?.toString();

		try {
			await db
				.insert(usersTable)
				.values({
					email,
					name,
					alias,
					bio
				})
				.onDuplicateKeyUpdate({
					set: {
						email,
						name,
						alias,
						bio
					}
				});

			return { success: true };
		} catch (error) {
			console.error('Upsert failed:', error);
			return fail(500, { success: false, error: 'Failed to save profile' });
		}
	}
};

// export const actions = {
// 	default: async ({ request }) => {
// 		const data = await request.formData();
// 		const email = data.get('email')?.toString();
// 		const password = data.get('password')?.toString();

// 		if (!email || !password) {
// 			return fail(400, { error: 'Email and password required' });
// 		}

// 		const existing = await prisma.user.findUnique({ where: { email } });
// 		if (existing) {
// 			return fail(400, { error: 'User already exists' });
// 		}

// 		const hashed = await bcrypt.hash(password, 12);

// 		await prisma.user.create({
// 			data: { email, password: hashed }
// 		});

// 		throw redirect(303, '/login?created=1');
// 	}
// };
