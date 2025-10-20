<script>
	import { page } from '$app/stores';
	import Card from '../shared/card.svelte';
	import Anchor from '../shared/anchor.svelte';

	const props = $props();
	const { log, error } = console;

	const handleMouseEvent = (event) => {
		const wrapper = event.currentTarget;
		const x = event.clientX;
		const y = event.clientY;

		document.querySelectorAll('.card-wrapper').forEach((el) => {
			el.style.setProperty('--x', `${x}px`);
			el.style.setProperty('--y', `${y}px`);
		});
	};

	const handleclick = (e) => {
		if (props.default) return;
		document.body.classList.add('no-scroll');
	};
</script>

<svelte:body onmousemove={handleMouseEvent} />

<div
	class="wrapper"
	class:list={props.subFilter ? props.subFilter != 'list' : false}
	style={`columns: ${props.columns || 4};`}
>
	{#each props.cardItems as item}
		<div class="card-wrapper">
			<Anchor ghost link={'/projects' + (item.link || '')} onclick={handleclick}>
				<Card
					subFilter={props.subFilter}
					src={item.src}
					title={item.title}
					description={item.description}
				></Card>
			</Anchor>
		</div>
	{/each}
</div>

<style>
	div.wrapper {
		gap: 0.5rem;

		@media (max-width: 768px) {
			columns: 3 !important;
		}

		@media (max-width: 576px) {
			columns: 2 !important;

			& > div.card-wrapper {
				background: none !important;
			}
		}

		@media (max-width: 400px) {
			columns: 1 !important;
		}

		div.card-wrapper {
			transition: all ease-in-out 300ms;
			border-radius: 6px;
			padding: 0.4rem;
			margin-bottom: 0.5rem;
		}

		& > div.card-wrapper {
			background-size: cover;
			background-attachment: fixed;
			background-image: radial-gradient(250px circle at var(--x) var(--y), orangered, transparent);

			&:hover {
				background-color: rgba(255, 68, 0, 0.329) !important;
			}
		}
	}

	div.wrapper.list {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		& > div.card-wrapper {
			background: none !important;

			&:hover {
				background-color: rgba(255, 68, 0, 0.329) !important;
			}
		}
	}
</style>
