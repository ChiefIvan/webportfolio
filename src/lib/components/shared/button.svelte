<script>
	const {
		type = 'button',
		onclick = () => {},
		disabled = false,
		primary = false,
		danger = false,
		ghost = false,
		outlined = false,
		custom = false,
		borderColor = 'transparent',
		radius = '0.5rem',
		gap = '0.5rem',
		padding = '0.5rem 1rem',
		width = 'auto',
		alignItems = 'center',
		justifyContent = 'center',
		backgroundColor = 'transparent',
		color = 'var(--light-theme-color-6)',
		children = () => null
	} = $props();
</script>

<button
	{type}
	{onclick}
	{disabled}
	class:primary
	class:danger
	class:ghost
	class:outlined
	class:custom
	class:disabled
	style={`
		border-color: ${borderColor}; 
		border-radius: ${radius}; 
		gap: ${gap}; 
		padding: ${padding}; 
		width: ${width}; 
		align-items: ${alignItems}; 
		justify-content: ${justifyContent}; 
		background-color: ${backgroundColor}; 
		color: ${color};
	`}
>
	{@render children()}
</button>

<style>
	button {
		display: flex;
		transition: all ease-in-out 100ms;

		&:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		&:active {
			opacity: 0.5;
		}
	}

	button.primary {
		background-color: #0053bd !important;
		border-radius: 0.5rem;
	}

	button.danger {
		background-color: #ff0000 !important;
		border-radius: 0.5rem;
	}

	button.ghost {
		color: var(--dark-theme-color-5);
		font-weight: 900;
	}

	button.outlined {
		border: 1px solid var(--light-theme-color-2) !important;

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
		color: var(--light-theme-color-1) !important;
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
		color: var(--light-theme-color-2) !important;
		border: 1px solid var(--light-theme-color-2) !important;
	}
</style>
