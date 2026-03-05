<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signIn, signOut } from '@auth/sveltekit/client';

	import Button from '$lib/components/shared/button.svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Google from '$src/lib/components/icons/google.svelte';
	import Input from '$src/lib/components/shared/input.svelte';

	let session = null;

	$: callbackUrl = $page.url.searchParams.get('callbackUrl') ?? '/admin';
	$: console.log($page.url.searchParams.get('callbackUrl'));
</script>

<svelte:head>
	<title>Ban | Admin - Login</title>
</svelte:head>

<div class="login-wrapper">
	<div class="login">
		<h2>Admin Login</h2>
		<p class="note">Note: You aren't supposed to be here, unless, if you're Admin Ban!</p>
		<form action="">
			<Input required inputName="Email" type="email"></Input>
		</form>
		<div class="button-wrapper">
			<p class="sep">or</p>
			{#if !session}
				<Button
					ghost
					padding="0"
					onclick={() =>
						signIn('github', {
							redirectTo: callbackUrl,
							authorizationParams: { prompt: 'login' }
						})}
				>
					<Github height="34" width="34" fill="#000"></Github>
				</Button>
				<Button
					ghost
					padding="0"
					onclick={() =>
						signIn('google', {
							redirectTo: callbackUrl,
							authorizationParams: { prompt: 'login' }
						})}
				>
					<Google></Google>
				</Button>
			{/if}
		</div>
		{#if $page.url.searchParams.get('error') === 'access_denied' || $page.error}
			<p class="error">Access denied — your account is not on the admin allow-list.</p>
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
			row-gap: 1rem;
			padding: 2rem 4rem;
			border-radius: 0.5rem;
			align-items: center;
			max-width: 35rem;
			width: 100%;
			box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);

			p {
				text-align: center;
				color: red;
				font-style: italic;
			}

			p.note {
				width: 70%;
			}

			form {
				margin-block: 0.5rem;
				width: inherit;
			}

			div.button-wrapper {
				position: relative;
				display: flex;
				column-gap: 0.5rem;
				border-top: 1px solid var(--light-theme-color-2);
				padding: 1.5rem;
				align-items: center;
				justify-content: center;

				p.sep {
					position: absolute;
					top: -1.25rem;
					padding: 0.5rem 1.5rem;
					background-color: #fff;
					color: var(--light-theme-color-6);
				}
			}

			p.error {
				font-weight: bold;
			}

			h2 {
				color: var(--dark-theme-color-5);
				font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				font-size: 2rem;
				letter-spacing: -0.09rem;
			}
		}
	}
</style>
