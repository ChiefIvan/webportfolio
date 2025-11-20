<script>
	const props = $props();
</script>

<li style="padding: {props.padding || '0 0.5rem'}; width: {props.width || 'auto'};};">
	{@render props.children()}
</li>

<style>
	li {
		display: inline-block;
		align-content: center;
		border-radius: 1px;
		height: 100%;
		/* width: 100%; */

		@media (max-width: 576px) {
			margin-block: 0.2rem;
			display: block;
			height: 3.5rem;
		}
	}
</style>
