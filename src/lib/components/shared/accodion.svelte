<script>
	import Button from './button.svelte';
	import Dropdown from '../icons/dropdown.svelte';

	const props = $props();

	let isOpen = $state(false);

	const handleAccordionToggle = (event) => {
		event.preventDefault();
		isOpen = !isOpen;
	};
</script>

<div class="accordion-wrapper">
	<Button ghost width="100%" justifyContent="space-between" onclick={handleAccordionToggle}>
		<h4>
			{props.title}
			{#if props.isCurrent}
				<span>(current)</span>
			{/if}
		</h4>
		<div class="icon-wrapper" class:rotate={isOpen}>
			<Dropdown />
		</div>
	</Button>
	<div class="accordion-content" class:expand={isOpen}>
		<div class="content">
			{@render props.children()}
		</div>
	</div>
</div>

<style>
	div.accordion-wrapper {
		border-bottom: 1px solid var(--light-theme-color-1);

		h4 {
			font-size: 1.1rem;
			letter-spacing: -0.09rem;
			font-weight: 700;
			text-align: start;
			color: var(--light-theme-color-6);

			span {
				font-size: 0.8rem;
				font-weight: 400;
				font-style: italic;
				opacity: 0.7;
				color: var(--light-theme-color-4);
			}
		}

		div.icon-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			transition: transform ease-in-out 300ms;
		}

		div.icon-wrapper.rotate {
			transform: rotate(180deg);
		}

		div.accordion-content {
			display: grid;
			grid-template-rows: 0fr;
			transition: all ease-in-out 300ms;

			div.content {
				overflow: hidden;
				min-height: 0;
				padding-inline: 1rem;
			}
		}

		div.expand {
			grid-template-rows: 1fr;
		}
	}
</style>
