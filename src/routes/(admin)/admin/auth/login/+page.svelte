<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signIn, signOut } from '@auth/sveltekit/client';

	import Button from '$lib/components/shared/button.svelte';
	import Github from '$lib/components/icons/github.svelte';

	let session = null;

	$: callbackUrl = $page.url.searchParams.get('callbackUrl') ?? '/admin/dashboard';
</script>

<svelte:head>
	<title>Ban | Admin - Login</title>
</svelte:head>

<div class="login-wrapper">
	<div class="login">
		{#if !session}
			<h2>Admin Login</h2>
			<Button
				primary
				gap="0.5rem"
				padding="0.2rem 2rem"
				onclick={() => signIn('github', { callbackUrl })}
			>
				<Github></Github>
				Login to Github
			</Button>
		{/if}
	</div>
</div>

<style>
	div.login-wrapper {
		height: 100dvh;
		display: grid;
		align-content: center;
		justify-items: center;

		div.login {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			border: 1px solid var(--light-theme-color-2);
			padding: 2rem 4rem;
			border-radius: 0.5rem;

			h2 {
				color: var(--dark-theme-color-5);
				font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				font-size: 2rem;
				letter-spacing: -0.09rem;
			}
		}
	}
</style>
