import { SvelteKitAuth } from '@auth/sveltekit';
import {
	GITHUB_ID,
	GITHUIB_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET,
	ADMIN_EMAILS_ALLOW_LIST,
	GITHUB_SECRET
} from '$env/static/private';
import Github from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';

const allowedEmails = ADMIN_EMAILS_ALLOW_LIST?.split(',').map((e) => e.trim().toLowerCase()) ?? [];

export const { handle } = SvelteKitAuth({
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60
	},
	jwt: {
		maxAge: 15 * 60
	},
	providers: [
		Github({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}),
		Google({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET
		})
	],

	callbacks: {
		async signIn({ user }) {
			const email = user.email?.toLowerCase();
			if (!email || !allowedEmails.includes(email)) {
				return '/admin/auth/login?error=access_denied';
			}

			return true;
		},
		async jwt({ token, account, user }) {
			if (account && user) {
				token.provider = account.provider;
				token.userId = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.provider = token.provider;
			session.user.id = token.userId;

			if (session?.user?.email) {
				session.user.isAdmin = allowedEmails.includes(session.user.email.toLowerCase());
			} else session.user.isAdmin = false;
			return session;
		}
	}
});
