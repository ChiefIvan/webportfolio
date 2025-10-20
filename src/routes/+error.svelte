<script lang="ts">
	import { page } from '$app/state';
	import Anchor from '$lib/components/shared/anchor.svelte';

	const origin = page.url.origin;
</script>

<svelte:head>
	<title>{page.status} - Error</title>
</svelte:head>

<div class="error-wrapper">
	<div class="error">
		<div class="error-contents">
			<h1>{page.status}</h1>
			<div class="main-contents">
				<h3>{page.error.message}</h3>
				<p>The page you're looking for was moved, removed, renamed or might never existed.</p>
			</div>
		</div>
		<Anchor nav link={origin}>
			<p class="link-text">Back to Home</p>
		</Anchor>
	</div>
</div>

<style>
	div.error-wrapper {
		height: 100dvh;
		display: grid;
		align-content: center;

		div.error {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			div.error-contents {
				max-width: 37rem;
				display: flex;
				align-items: center;
				margin-bottom: 2rem;

				h1 {
					border-right: 1px solid var(--light-theme-color-6);
					font-size: 8rem;
					font-weight: 900;
					color: rgba(255, 0, 0, 0.534);
					padding-right: 2rem;
				}

				div.main-contents {
					margin-left: 2rem;

					h3 {
						font-size: 1.8rem;
						font-weight: 800;
						color: var(--dark-theme-color-5);
					}

					p {
						color: var(--light-theme-color-6);
					}
				}
			}

			p.link-text {
				font-weight: 600;
				color: var(--dark-theme-color-6);
				height: 1.8rem;
				padding-inline: 0.2rem;
			}
		}
	}
</style>
