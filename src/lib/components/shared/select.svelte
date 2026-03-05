<script>
	import Button from './button.svelte';
	import Dropdown from '../icons/dropdown.svelte';

	let { name, options, onclick, selected } = $props();
</script>

<div class="wrapper">
	<label for={name}>Level</label>
	<select {name} id={name} {onclick} bind:value={selected}>
		<Button ghost justifyContent="space-between" width="100%" type="button">
			<selectedcontent></selectedcontent>
			<span class="picker">></span>
		</Button>
		<option value="">Select an Option</option>
		{#each options as option}
			<option selected={option.selected} value={option.value}>{option.value}</option>
		{/each}
	</select>
</div>

<style>
	div.wrapper {
		max-width: 20rem;

		label {
			margin-inline: 0.5rem;
			font-weight: 700;
			color: var(--light-theme-color-6);
		}

		select {
			width: 100%;
			min-inline-size: 12ch;
			margin-top: 0.5rem;

			&:hover {
				cursor: pointer;
			}

			&,
			&::picker(select) {
				appearance: base-select;
				border: 1px solid var(--light-theme-color-2);
				line-height: 1.6;
				border-radius: 0.5rem;
				background-color: var(--light-theme-color-1);
			}

			&::picker(select) {
				margin-block-start: 0.5rem;
				cursor: pointer;
				padding: 0.5rem;
				margin-block: 0.5rem;
			}

			&::picker-icon {
				display: none;
			}

			selectedcontent {
				font-weight: 600;
			}

			span.picker {
				transition: rotate 300ms ease;

				:open & {
					rotate: 90deg;
				}
			}

			option {
				padding: 0.5rem;
			}
		}
	}
</style>
