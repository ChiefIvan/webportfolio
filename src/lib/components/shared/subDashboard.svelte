<script>
	const props = $props();
</script>

<div class="wrapper">
	<h2>{props.title}</h2>
	<div class="filter-wrapper">
		{@render props.children()}
	</div>
</div>

<style>
	div.wrapper {
		position: sticky;
		padding-top: 3rem;
		top: 3rem;
		z-index: 1;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-bottom: 1px solid var(--light-theme-color-1);
		box-shadow: 4px 4px 8px 1px rgba(0, 0, 0, 0.1);
		border-bottom-left-radius: 2rem;
		border-bottom-right-radius: 2rem;
		padding-inline: 1.5rem;

		@media (max-width: 768px) {
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
			padding-top: 1.8rem;
			padding-inline: 1rem;
		}

		h2 {
			font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
			font-size: 1.8rem;
			letter-spacing: -0.09rem;
			color: var(--dark-theme-color-5);
			border-bottom: 1px solid var(--light-theme-color-2);
			padding-bottom: 1rem;
			padding-inline: 1rem;

			@media (max-width: 576px) {
				padding-inline: 0.5rem;
			}
		}

		div.filter-wrapper {
			padding-block: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-inline: 2rem;

			@media (max-width: 576px) {
				padding-inline: 0.5rem;
			}
		}
	}
</style>
