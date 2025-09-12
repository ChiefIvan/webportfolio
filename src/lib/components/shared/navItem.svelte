<script>
	const props = $props();
</script>

<li>
	{@render props.children()}
</li>

<style>
	li {
		display: inline-block;
		padding-inline: 0.5rem;
		align-content: center;
		border-radius: 1px;
		height: 100%;

		@media (max-width: 576px) {
			margin-block: 0.2rem;
			display: block;
			height: 3.5rem;
		}
	}
</style>
