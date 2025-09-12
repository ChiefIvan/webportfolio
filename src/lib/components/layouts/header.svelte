<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import NavItem from '$lib/components/shared/navItem.svelte';
	import Anchor from '$lib/components/shared/anchor.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import Home from '../icons/home.svelte';
	import Background from '../icons/background.svelte';
	import Projects from '../icons/projects.svelte';
	import Blogs from '../icons/blogs.svelte';

	let isScreenSmall = $state(false);
	let isNavOpen = $state(false);

	const checkScreenSize = (e) => {
		isScreenSmall = window.innerWidth <= 576 ? true : false;
	};

	const handleNavClose = (e) => {
		if (isScreenSmall) {
			isNavOpen = false;
		}
	};

	onMount(() => {
		checkScreenSize();
	});
</script>

<svelte:window onresize={checkScreenSize} />

{#if isNavOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:fade={{ duration: 200 }}
		class="nav-content-overlay"
		onclick={() => (isNavOpen = false)}
		aria-label="Close navigation overlay"
	></div>
{/if}

<header class:is-open={isNavOpen}>
	{#if isScreenSmall}
		<div class="nav-content-wrapper-mobile">
			<Button ghost onclick={() => (isNavOpen = !isNavOpen)} aria-label="Toggle navigation">
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

	<div class="nav-content-wrapper" class:open={isNavOpen}>
		<div class="nav">
			<div class="logo-wrapper">
				<span> ban.dev </span>
			</div>
			<nav>
				<ul>
					<NavItem>
						<Anchor nav {isScreenSmall} icon={Home} onclick={handleNavClose} link="/">Home</Anchor>
					</NavItem>
					<NavItem>
						<Anchor
							nav
							{isScreenSmall}
							icon={Background}
							onclick={handleNavClose}
							link="/background">Background</Anchor
						>
					</NavItem>
					<NavItem>
						<Anchor nav {isScreenSmall} icon={Projects} onclick={handleNavClose} link="/projects"
							>Projects</Anchor
						>
					</NavItem>
					<NavItem>
						<Anchor nav {isScreenSmall} icon={Blogs} onclick={handleNavClose} link="/blogs"
							>Blogs</Anchor
						>
					</NavItem>
				</ul>
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
			background-color: rgba(0, 0, 0, 0.7);
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
		}

		header.is-open {
			border-bottom: none;
		}

		div.nav-content-wrapper {
			background-color: var(--light-theme-color-1);
			padding-inline: 0 !important;
			position: fixed;
			top: 0;
			left: 0;
			width: 0;
			border-bottom: none;
			height: 100dvh;
			overflow-y: hidden;
			z-index: 3;
			border-bottom-right-radius: 3rem;
			border-top-right-radius: 3rem;
		}

		div.open {
			width: 70%;
		}

		div.nav-content-wrapper-mobile {
			padding: 0.5rem;
		}
	}

	header {
		position: sticky;
		z-index: 3;
		top: 0;
		border-bottom: 1px solid var(--light-theme-color-1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		transition: border-bottom 300ms;

		div.nav-content-wrapper,
		div.nav-content-wrapper-mobile {
			transition: width 350ms;
		}

		div.nav-content-wrapper {
			div.nav {
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
				}
			}
		}
	}
</style>
