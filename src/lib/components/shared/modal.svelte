<script>
	import Button from './button.svelte';
	import Sign from './sign.svelte';
	let {
		description,
		itemName,
		Icon,
		handleProceed,
		handleAbort,
		proceedName = 'Save',
		abortName = 'Cancel',
		proceedButtonType = 'button',
		abortButtonType = 'button'
	} = $props();
</script>

<div class="modal-wrapper" role="dialog" aria-describedby="modalDescription">
	<div class="modal">
		{#if Icon}
			<div class="icon">
				<Icon></Icon>
			</div>
		{/if}
		<div id="modalDescription" class="content">
			{description}
			<span>{itemName}</span>
			<p>Note: This action cannot be undone!</p>
		</div>
		<div class="button-wrapper">
			<Button type={abortButtonType} danger onclick={handleAbort}>{abortName}</Button>
			<Button type={proceedButtonType} primary onclick={handleProceed}>{proceedName}</Button>
		</div>
	</div>
</div>

<style>
	div.modal-wrapper {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);

		div.modal {
			background-color: #fff;
			border-radius: 1rem;
			box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.3);
			padding: 1rem;

			div.icon {
				padding-bottom: 1.5rem;
				text-align: center;
			}

			div.content {
				text-align: center;
				border-top: 1px solid var(--light-theme-color-2);
				padding: 1.5rem;
				font-size: 1rem;
				font-weight: 600;
				color: var(--light-theme-color-6);

				span {
					background-color: var(--light-theme-color-2);
					color: var(--light-theme-color-5);
					padding: 0.1rem 0.4rem;
					border-radius: 0.3rem;
					font-size: 1rem;
					font-weight: 800;
					font-style: italic;
				}

				p {
					color: red;
					font-style: italic;
				}
			}

			div.button-wrapper {
				margin-top: 1rem;
				display: flex;
				justify-content: flex-end;
				column-gap: 0.5rem;
			}
		}
	}
</style>
