<script>
	const props = $props();
</script>

<div
	class:expanded={props.expanded}
	style={`left: ${props.left}; right: ${props.right}; top: ${props.top};  bottom: ${props.bottom}; height: ${props.height}`}
>
	<ul>
		{@render props.children()}
	</ul>
</div>

<style>
	div {
		position: absolute;
		background-color: #fffff0;
		box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		overflow: hidden;
		transition: all ease-in-out 300ms;
		display: grid;
		grid-template-rows: 0fr;

		& ul {
			min-height: 0;
			display: flex;
			flex-direction: column;
			transition: all ease-in-out 300ms;
		}
	}

	div.expanded {
		grid-template-rows: 1fr;
	}
</style>
