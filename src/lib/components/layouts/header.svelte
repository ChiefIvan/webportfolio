<script>
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { domSize } from '$lib/domSize';

	import NavItem from '$lib/components/shared/navItem.svelte';
	import Anchor from '$lib/components/shared/anchor.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import Home from '../icons/home.svelte';
	import Background from '../icons/background.svelte';
	import Projects from '../icons/projects.svelte';
	import Blogs from '../icons/blogs.svelte';

	const props = $props();

	let size = $state();
	let isScreenSmall = $state(false);
	let isNavOpen = $state(false);

	$effect(() => {
		isScreenSmall = size.width < 576 ? true : false;
	});

	const unsubscibe = domSize.subscribe((v) => (size = v));
	onDestroy(unsubscibe);

	const handleNavClose = (e) => {
		if (size.width < 576) {
			isNavOpen = false;
		}
	};

	const handleNavOpen = (e) => {
		isNavOpen = !isNavOpen;
		document.getElementById('assistant-overlay').classList.add('reduce-index');
	};
</script>

{#if !props.admin && isNavOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 200 }}
		class="nav-content-overlay"
		onclick={() => (isNavOpen = false)}
		aria-label="Close navigation overlay"
	></div>
{/if}

<header class:is-open={isNavOpen} class:admin={props.admin}>
	{#if !props.admin}
		{#if isScreenSmall}
			<div class="nav-content-wrapper-mobile">
				<Button ghost onclick={handleNavOpen} aria-label="Toggle navigation">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="burger-icon"
					>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				</Button>
			</div>
		{/if}
	{/if}

	<div class="nav-content-wrapper" class:admin={props.admin} class:open={isNavOpen}>
		<div class="nav-content" class:admin={props.admin}>
			{#if !props.admin}
				<div class="logo-wrapper">
					<span> ban.dev </span>
				</div>
			{/if}
			<nav>
				{#if props.navContents}
					<ul class:admin={props.admin}>
						{#each props.navContents as navContent}
							<NavItem>
								{@const Component = navContent.component}
								{#if !props.admin}
									<Component
										nav
										{isScreenSmall}
										onclick={handleNavClose}
										link={navContent.href}
										icon={navContent.icon}
									>
										{navContent.text}
									</Component>
								{:else}
									<Component></Component>
								{/if}
							</NavItem>
						{/each}
					</ul>
				{/if}
			</nav>
		</div>
	</div>
</header>

<style>
	@media (max-width: 576px) {
		div.nav-content-overlay {
			position: fixed;
			border: none;
			inset: 0;
			z-index: 3;
			overflow-y: auto;
			overflow-x: hidden;
			background-color: rgba(0, 0, 0, 0.8);
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
		}

		header.is-open {
			border-bottom: none;
		}

		div.nav-content-wrapper-mobile {
			padding: 0.5rem;
		}
	}

	header {
		position: sticky;
		z-index: 3;
		top: 0;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		transition: border-bottom 300ms;

		div.nav-content-wrapper,
		div.nav-content-wrapper-mobile {
			transition: width 350ms;
		}

		div.nav-content-wrapper {
			div.nav-content {
				display: flex;
				justify-content: space-between;
				align-items: center;

				@media (max-width: 576px) {
					display: block;
				}

				div.logo-wrapper {
					span {
						font-family: 'Inter';
						font-size: 1.7rem;
						letter-spacing: -0.18rem;
						background-image: linear-gradient(to top right, #0053bd, orangered);
						background-clip: text;
						-webkit-background-clip: text;
						background-size: cover;
						color: transparent;
						padding-inline: 0.2rem;

						@media (max-width: 576px) {
							padding-inline-start: 1rem;
							/* font-size: 2rem; */
						}
					}

					@media (max-width: 576px) {
						padding-block: 1rem;
						padding-inline: 0.5rem;
						border-bottom: 1px solid var(--light-theme-color-2);
						margin-bottom: 1rem;
					}
				}

				nav {
					ul {
						height: 5rem;

						@media (max-width: 576px) {
							height: auto;
						}
					}

					ul.admin {
						height: auto;
						margin-block: 0.2rem;
					}
				}
			}

			div.nav-content.admin {
				justify-content: flex-end;
			}
		}

		div.nav-content-wrapper.admin {
			max-width: none !important;
			margin: 0 !important;
		}
	}

	header.admin {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: rgba(255, 255, 255, 0.1);
		height: 48.5px;
	}
</style>
