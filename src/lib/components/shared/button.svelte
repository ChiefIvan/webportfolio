<script>
	const props = $props();

	let button;

	export const bindRef = () => {
		return button;
	};
</script>

<button
	bind:this={button}
	type={props.type}
	onclick={props.onclick}
	class:ghost={props.ghost}
	class:dropdown={props.dropdown}
	class:custom={props.custom}
	class:primary={props.primary}
	class:disabled={props.disabled}
	class:active={props.active}
	disabled={props.disabled}
	style={`border-radius: ${props.radius}; gap: ${props.gap}; padding: ${props.padding}; width: ${props.width}; align-items: ${props.alignItems}; justify-content: ${props.justifyContent};`}
>
	{@render props.children()}
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		transition: all ease-in-out 100ms;
	}

	button:hover {
		cursor: pointer;
		opacity: 0.8;
	}

	button:active {
		opacity: 0.5;
	}

	button.active {
		background-color: var(--dark-theme-color-6) !important;
		color: var(--light-theme-color-1) !important;
	}

	button.ghost {
		background-color: transparent;
		border: 2px solid transparent;
		font-weight: 900;
		color: var(--dark-theme-color-5);
	}

	button.ghost:hover {
		background-color: var(--light-theme-color-1);
		border-color: transparent;
	}

	button.ghost.dropdown {
		color: var(--light-theme-color-6) !important;
		font-weight: 600;
	}

	button.ghost.dropdown.active {
		background-color: var(--light-theme-color-2) !important;
		color: var(--dark-theme-color-6) !important;
	}

	button.primary {
		background-color: #0053bd;
		color: var(--light-theme-color-1);
		border-color: transparent;
		border-radius: 0.5rem;
	}

	button.custom {
		background-image: linear-gradient(to top right, #0053bd, orangered);
		color: var(--light-theme-color-1);
		border: none;
	}

	button.custom:hover {
		opacity: 0.8;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
	}

	button.disabled {
		background-color: var(--light-theme-color-3);
		color: var(--light-theme-color-1);
		cursor: none;
	}
</style>
