<script>
	const props = $props();
</script>

<table>
	{@render props.children()}
</table>

<style>
	table {
		table-layout: fixed;
		border-collapse: collapse;
		/* max-width: 800px; */
		margin: auto;
	}
</style>
