import { SvelteKitAuth } from '@auth/sveltekit';
import { GITHUB_ID, GITHUB_SECRET, ADMIN_EMAILS_ALLOW_LIST } from '$env/static/private';
import Github from '@auth/core/providers/github';

const allowedEmails = ADMIN_EMAILS_ALLOW_LIST?.split(',').map((e) => e.trim().toLowerCase()) ?? [];

export const { handle } = SvelteKitAuth({
	providers: [Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
	callbacks: {
		async signIn({ user }) {
			const email = user.email?.toLowerCase();

			if (!email || !allowedEmails.includes(email)) {
				return '/admin/auth/login?error=access_denied';
			}

			return true;
		},
		async session({ session, user }) {
			if (session?.user?.email) {
				session.user.isAdmin = allowedEmails.includes(session.user.email.toLowerCase());
			} else {
				session.user.isAdmin = false;
			}

			return session;
		}
	}
});
