<script>
	import { onMount } from 'svelte';

	import Button from '$lib/components/shared/button.svelte';
	import Card from '$lib/components/shared/card.svelte';
	import MobileDev from '$lib/assets/mobile_development.jpg';
	import WebDev from '$lib/assets/web_development.jpg';
	import Other from '$lib/assets/more.jpg';
	import CardWrapper from '$lib/components/layouts/cardWrapper.svelte';
	import Grid from '$lib/components/icons/grid.svelte';
	import List from '$lib/components/icons/list.svelte';

	const { data, error } = $props();

	let isLoading = $state(true);
	let filterState = $state('all');
	let subFilter = $state('grid');

	$effect(() => {
		if (data || error) {
			isLoading = false;
		}
	});

	const handleFilterClick = (filter) => {
		filterState = filter;
	};
</script>

<svelte:head><title>Ban | Projects</title></svelte:head>

<div class="project-wrapper">
	<h2>My Works</h2>
	<div class="filter-wrapper">
		<div class="main-filters">
			<h4>Filters:</h4>
			<!-- <Button primary active={filterState == 'all'} onclick={() => handleFilterClick('all')}
				>All</Button
			>
			<Button
				primary
				active={filterState == 'programming'}
				onclick={() => handleFilterClick('programming')}>programming</Button
			>
			<Button
				primary
				active={filterState == 'designing'}
				onclick={() => handleFilterClick('designing')}>designing</Button
			>
			<Button primary active={filterState == 'ai'} onclick={() => handleFilterClick('ai')}
				>AI</Button
			> -->
		</div>
		<div class="sub-filters">
			<Button
				ghost
				padding="0"
				onclick={() => (subFilter = subFilter === 'grid' ? 'list' : 'grid')}
			>
				{#if subFilter === 'grid'}
					<Grid></Grid>
				{:else}
					<List></List>
				{/if}
			</Button>
		</div>
	</div>
</div>
<div class="works-wrapper">
	{#if isLoading}
		<p>Loading...</p>
	{:else if error}
		<p>Error loading projects: {error.message}</p>
	{:else}
		<CardWrapper cardItems={data.samples}></CardWrapper>
	{/if}
</div>

<style>
	@media (max-width: 576px) {
		:global(div.main-content-wrapper) {
			padding: 0rem;
		}
	}

	div.project-wrapper {
		position: sticky;
		padding-top: 3rem;
		top: 3rem;
		z-index: 1;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border-bottom: 1px solid var(--light-theme-color-1);
		box-shadow: 4px 4px 8px 1px rgba(0, 0, 0, 0.1);
		border-bottom-left-radius: 2rem;
		border-bottom-right-radius: 2rem;
		padding-inline: 1.5rem;

		@media (max-width: 768px) {
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
			padding-top: 1.8rem;
			padding-inline: 1rem;
		}

		h2 {
			font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
			font-size: 1.8rem;
			letter-spacing: -0.09rem;
			color: var(--dark-theme-color-5);
			border-bottom: 1px solid var(--light-theme-color-2);
			padding-bottom: 1rem;
			padding-inline: 1rem;

			@media (max-width: 576px) {
				padding-inline: 0.5rem;
			}
		}

		div.filter-wrapper {
			padding-block: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-inline: 2rem;

			@media (max-width: 576px) {
				padding-inline: 0.5rem;
			}

			div.main-filters {
				display: inherit;
				align-items: center;
				gap: 0.5rem;

				h4 {
					font-size: 1rem;
					color: var(--dark-theme-color-5);
					font-weight: 600;
					letter-spacing: -0.06rem;
				}
			}
		}
	}

	div.works-wrapper {
		padding-inline: 1rem;
		margin-top: 1rem;
	}
</style>
