<script>
	import { createEventDispatcher } from 'svelte';

	import Button from './button.svelte';
	import Sign from './sign.svelte';
	import Delete from '$lib/components/icons/delete.svelte';
	import { text } from '@sveltejs/kit';

	const dispatch = createEventDispatcher();

	const props = $props();
</script>

<div class="input-wrapper">
	<div class="input" class:textarea={props.textarea}>
		{#if !props.textarea}
			<input
				placeholder=""
				required={props.required}
				id={props.inputName}
				name={props.inputName}
				type={props.inputType}
				class:danger={props.danger}
				class:disabled={props.disabled}
				class:password={props.password}
				oninput={props.oninput}
				value={props.inputValue}
				style={`font-weight: ${props.fontWeight}`}
				disabled={props.disabled}
				autocomplete="off"
			/>
		{:else}
			<textarea
				placeholder=""
				required={props.required}
				id={props.inputName}
				name={props.inputName}
				class:disabled={props.disabled}
				oninput={props.oninput}
				value={props.inputValue}
				style={`font-weight: ${props.fontWeight}`}
				disabled={props.disabled}
			></textarea>
		{/if}
		<label
			class="placeholder"
			class:textarea={props.textarea}
			class:disabled={props.disabled}
			for={props.inputName}>{props.inputName}</label
		>
	</div>
	<div class="floaters">
		{#if props.danger}
			<Sign markingSign={props.markingSign} tooltipContent={props.tooltipContent}></Sign>
		{/if}
		{#if props.search && props.inputValue.length}
			<div class="button-wrapper">
				<Button
					ghost
					onclick={() => {
						dispatch('clear');
					}}
				>
					<Delete></Delete>
				</Button>
			</div>
		{/if}
		{#if props.password}
			<div class="button-wrapper">
				<Button
					buttonLabel="Password button"
					onclick={() => (props.inputType = props.inputType == 'password' ? 'text' : 'password')}
					ghost
				>
					{#if props.inputType == 'password'}
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16"
							><path
								fill="var(--light-theme-color-5)"
								fill-rule="evenodd"
								d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7 7 0 0 0 2.16-3.11a.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76zm3.196 3.195l1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109"
								clip-rule="evenodd"
							/><path
								fill="var(--light-theme-color-5)"
								d="m7.812 10.994l1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566a7 7 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806"
							/></svg
						>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"
							><g fill="var(--light-theme-color-5)"
								><path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6" /><path
									fill-rule="evenodd"
									d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69c.12.362.12.752 0 1.113c-1.487 4.471-5.705 7.697-10.677 7.697c-4.97 0-9.186-3.223-10.675-7.69a1.76 1.76 0 0 1 0-1.113M17.25 12a5.25 5.25 0 1 1-10.5 0a5.25 5.25 0 0 1 10.5 0"
									clip-rule="evenodd"
								/></g
							></svg
						>
					{/if}
				</Button>
			</div>
		{/if}
	</div>
</div>

<style>
	div.input-wrapper {
		position: relative;

		& div.input {
			position: relative;
			display: flex;
			align-items: center;

			input,
			textarea,
			label.placeholder {
				color: var(--light-theme-color-6);
			}

			input {
				border: 2px solid transparent;
				border-bottom: 2px solid var(--light-theme-color-2);

				&:focus {
					border-bottom-color: var(--dark-theme-color-6);
				}

				&:focus + .placeholder,
				&:not(:placeholder-shown) + .placeholder {
					transform: translateY(-1.3rem);
				}
			}

			textarea {
				min-height: 15rem;
				resize: vertical;
				border: 2px solid var(--light-theme-color-2);

				&:focus {
					border-color: var(--dark-theme-color-6);
				}

				&:focus + .placeholder,
				&:not(:placeholder-shown) + .placeholder {
					transform: translateY(-1.6rem);
				}
			}

			input,
			textarea {
				width: 100%;
				padding: 0.5rem;
				transition: all ease-in-out 200ms;
				background-color: transparent;
				outline: none;
				font-family: 'Inter', Arial, Helvetica, sans-serif;

				&:focus + .placeholder,
				&:not(:placeholder-shown) + .placeholder {
					font-size: 0.6rem !important;
					padding-left: 0.3rem;
				}
			}

			input:focus,
			textarea:focus {
				& + label.placeholder {
					color: var(--dark-theme-color-6);
				}
			}

			label.placeholder {
				position: absolute;
				padding-left: 0.5rem;
				transition: all ease-in-out 200ms;
				z-index: -1;
				font-weight: 600;
				user-select: none;
				-webkit-user-select: none;
			}

			label.placeholder.textarea {
				top: 0rem;
				margin-top: 0.5rem;
			}

			input.disabled,
			textarea.disabled,
			label.placeholder.disabled {
				color: var(--light-theme-color-3);
			}

			& input.danger {
				border-bottom-color: #ff0000;
				padding-right: 4rem;
			}

			& input.danger + label.placeholder {
				color: #ff0000;
			}

			& input[type='search'] + label.placeholder {
				font-size: 0.9rem;
			}

			& input[type='search']::-webkit-search-decoration,
			input[type='search']::-webkit-search-cancel-button,
			input[type='search']::-webkit-search-results-button,
			input[type='search']::-webkit-search-results-decoration {
				display: none;
			}
		}

		div.textarea {
			align-items: flex-start;
		}

		& div.floaters {
			position: absolute;
			top: 0;
			right: 0.5rem;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			column-gap: 0.2rem;
			z-index: 1;
		}

		/* & div.input:focus-within label.placeholder,
    input[type="search"]:not(:placeholder-shown) + label.placeholder {
      transform: translatey(-1.1rem) !important;
      font-size: 0.6rem !important;
      padding-left: 0.3rem;
    } */
	}
</style>
