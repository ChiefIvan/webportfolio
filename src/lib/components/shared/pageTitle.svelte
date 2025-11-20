<script>
	const props = $props();
</script>

<h1 style={`border-left: 6px solid ${props.borderColor}`}>
	{props.text}
</h1>

<style>
	h1 {
		border-top-left-radius: 0.3rem;
		border-bottom-left-radius: 0.3rem;
		font-size: 1.5rem;
		color: var(--dark-theme-color-5);
		margin-block: 1rem;
		padding: 0.5rem 0.8rem;
	}
</style>
