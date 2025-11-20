import { SvelteKitAuth } from '@auth/sveltekit';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import Github from '@auth/core/providers/github';

export const { handle } = SvelteKitAuth({
	providers: [Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
});
