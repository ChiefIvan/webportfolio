<script>
	import { onMount, tick, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { domSize } from '$lib/domSizeStore.js';

	import Button from '$lib/components/shared/button.svelte';
	import Card from '$lib/components/shared/card.svelte';
	import CardWrapper from '$lib/components/layouts/cardWrapper.svelte';
	import Grid from '$lib/components/icons/grid.svelte';
	import List from '$lib/components/icons/list.svelte';
	import Dropdown from '$lib/components/shared/dropdown.svelte';
	import DropdownIcon from '$lib/components/icons/dropdown.svelte';

	const { data, error, children } = $props();
	const positions = new Map();
	const STORAGE_KEY = 'projects-scroll-positions';

	let size = $state();
	let slug = $state();
	let isScreenSmall = $state(false);
	let isLoading = $state(true);
	let filterState = $state('all');
	let isFilterExpanded = $state(false);
	let subFilter = $state('list');

	$effect(() => {
		isScreenSmall = size.width < 576 ? true : false;
	});

	$effect(() => {
		if (data || error) {
			isLoading = false;
		}
	});

	$effect(() => {
		subFilter = isScreenSmall ? 'grid' : 'list';
	});

	const unsubscibe = domSize.subscribe((v) => (size = v));

	const handleFilterClick = (filter) => {
		filterState = filter;

		if (isScreenSmall) {
			isFilterExpanded = false;
		}
	};

	const filterExpandHandler = () => {
		isFilterExpanded = !isFilterExpanded;
	};

	onMount(() => {
		if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			if (raw) JSON.parse(raw).forEach(([k, v]) => positions.set(k, v));
		} catch (e) {
			console.warn('failed to parse saved scroll positions', e);
		}
	});

	beforeNavigate(({ from }) => {
		if (!from?.url) return;
		const key = from.url.pathname + from.url.search;
		positions.set(key, window.scrollY || window.pageYOffset || 0);
		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(positions.entries())));
		} catch (_) {}
	});

	afterNavigate(async ({ to }) => {
		if (!to?.url) return;
		const key = to.url.pathname + to.url.search;
		const y = positions.get(key);

		if (typeof y === 'number') {
			await tick();
			requestAnimationFrame(() => window.scrollTo(0, y));
		}
	});

	onDestroy(unsubscibe);
</script>

<svelte:head><title>Ban | Projects</title></svelte:head>

{#if children}
	{@render children({ key: $page.url.pathname })}
{/if}

<div class="project-wrapper">
	<h2>My Works</h2>
	<div class="filter-wrapper">
		<div class="main-filters">
			<h4>Filters:</h4>
			{#if isScreenSmall}
				<Button primary padding="0.2rem 1rem" onclick={filterExpandHandler}>
					{filterState}
					<DropdownIcon></DropdownIcon>
				</Button>
				<Dropdown top="3rem" left="3.2rem" expanded={isFilterExpanded}>
					{#each ['all', 'programming', 'designing', 'AI'] as choice (choice)}
						<li>
							<Button
								width="12rem"
								justifyContent="flex-start"
								active={choice == filterState}
								onclick={() => handleFilterClick(choice)}
								dropdown
								ghost
							>
								{choice}
							</Button>
						</li>
					{/each}
				</Dropdown>
			{:else}
				<Button primary active={filterState == 'all'} onclick={() => handleFilterClick('all')}
					>all</Button
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
				>
			{/if}
		</div>
		<div class="sub-filters">
			<Button
				ghost
				padding="0"
				onclick={() => (subFilter = subFilter === 'grid' ? 'list' : 'grid')}
			>
				{#if subFilter === 'grid'}
					<List></List>
				{:else}
					<Grid></Grid>
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
		<CardWrapper {subFilter} cardItems={data.samples}></CardWrapper>
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
				position: relative;

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
