<script>
	const props = $props();
</script>

<button
	type={props.type}
	onclick={props.onclick}
	disabled={props.disabled}
	class:primary={props.primary}
	class:danger={props.danger}
	class:ghost={props.ghost}
	class:outlined={props.outlined}
	class:custom={props.custom}
	class:disabled={props.disabled}
	style={`
		border-color: ${props.borderColor}; 
		border-radius: ${props.radius}; 
		gap: ${props.gap}; 
		padding: ${props.padding}; 
		width: ${props.width}; 
		align-items: ${props.alignItems}; 
		justify-content: ${props.justifyContent}; 
		background-color: ${props.backgroundColor}; 
		color: ${props.color};
	`}
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
		color: var(--light-theme-color-6);

		&:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		&:active {
			opacity: 0.5;
		}
	}

	button.primary {
		background-color: #0053bd;
		border-radius: 0.5rem;
	}

	button.danger {
		background-color: #ff0000;
		border-radius: 0.5rem;
	}

	button.ghost {
		color: var(--dark-theme-color-5);
		font-weight: 900;
	}

	button.outlined {
		border: 1px solid var(--light-theme-color-2);

		&:hover {
			border-color: var(--dark-theme-color-6);
		}
	}

	button.ghost,
	button.outlined {
		background-color: transparent;
	}

	button.custom {
		background-image: linear-gradient(to top right, #0053bd, orangered);

		&:hover {
			box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
		}
	}

	button.primary,
	button.danger,
	button.custom {
		color: var(--light-theme-color-1);
	}

	button.ghost,
	button.primary,
	button.danger,
	button.custom {
		border: none;
	}

	button.disabled {
		opacity: 1;
		cursor: default;
		background-color: default;
		color: var(--light-theme-color-2);
		border: 1px solid var(--light-theme-color-2);

		&:hover {
			border-color: var(--light-theme-color-2);
		}
	}
</style>
