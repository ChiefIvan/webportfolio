<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-wrapper">
	<div class="error-contents">
		<h1>{page.status}</h1>
		<h3>{page.error.message}</h3>
		<p>The page you're looking for is not available at the moment!</p>
	</div>
</div>

<style>
	div.error-wrapper {
		margin-block: 3rem;
		padding-block: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		text-align: center;

		div.error-contents {
			max-width: 30rem;
			h1 {
				font-size: 6rem;
				font-weight: 900;
				color: rgba(255, 0, 0, 0.534);
			}

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
</style>
