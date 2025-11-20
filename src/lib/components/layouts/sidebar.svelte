<script>
	import { fade } from 'svelte/transition';

	import Button from '$lib/components/shared/button.svelte';
	import NavItem from '../shared/navItem.svelte';
	import Anchor from '../shared/anchor.svelte';
	import DashboardIcon from '$lib/components/icons/dashboard.svelte';
	import SettingsIcon from '$lib/components/icons/settings.svelte';
	import Favicon from '$lib/assets/img/favicon.png';

	let isExpanded = true;
</script>

<div class="sidebar-wrapper" class:expanded={isExpanded}>
	<aside>
		<div class="brand-wrapper">
			<img src={Favicon} alt="Logo" />
			{#if isExpanded}
				<span transition:fade={{ duration: 300 }}> ban.dev </span>
			{/if}
		</div>
		<nav>
			<ul>
				<NavItem padding="0" width="100%">
					<Anchor nav admin={true} icon={DashboardIcon} link="/admin/dashboard">
						{#if isExpanded}
							<span transition:fade={{ duration: 300 }}> Dashboard </span>
						{/if}
					</Anchor>
				</NavItem>
				<NavItem padding="0" width="100%">
					<Anchor nav admin={true} icon={SettingsIcon} link="/admin/settings">
						{#if isExpanded}
							<span transition:fade={{ duration: 300 }}> Settings </span>
						{/if}
					</Anchor>
				</NavItem>
			</ul>
		</nav>
	</aside>
	<div class="close-sidebar-button">
		<div class="side-button">
			<Button
				width="100%"
				ghost
				onclick={() => {
					isExpanded = !isExpanded;
				}}
			>
				<div class="close-icon-wrapper">
					<div class="icon" class:closed={!isExpanded}></div>
				</div>
			</Button>
		</div>
	</div>
</div>

<style>
	div.sidebar-wrapper {
		max-width: 52px;
		width: 100%;
		height: 100dvh;
		padding-inline: 0.5rem;
		transition: all ease-in-out 300ms;
		background-color: var(--light-theme-color-1);
		position: sticky;
		top: 0;
	}

	aside {
		overflow: hidden;

		div.brand-wrapper {
			padding-block: 0.4rem;
			border-bottom: 1px solid var(--light-theme-color-2);
			display: flex;
			align-items: center;
			flex-wrap: nowrap;

			img {
				max-width: 2.5rem;
			}

			span {
				font-family: 'Inter', Arial, Helvetica, sans-serif;
				font-size: 1.5rem;
				letter-spacing: -0.15rem;
				background-image: linear-gradient(to top right, #0053bd, orangered);
				background-clip: text;
				-webkit-background-clip: text;
				background-size: cover;
				color: transparent;
				padding-inline: 0.5rem;
			}
		}

		nav {
			margin-top: 1.5rem;

			ul {
				span {
					font-size: 1rem;
				}
			}
		}
	}

	div.close-sidebar-button {
		position: absolute;
		top: 0;
		right: -2rem;
		display: flex;
		align-items: center;
		max-width: 2rem;
		width: 100%;
		height: inherit;

		div.side-button {
			div.close-icon-wrapper {
				position: relative;

				div.icon::before,
				div.icon::after {
					content: '';
					display: block;
					width: 0.7rem;
					height: 1.5rem;
					transition: all ease-in-out 150ms;
					background-color: var(--light-theme-color-6);
				}

				div.icon::before {
					transform: translateY(0.1rem);
					border-radius: 999px 999px 0 0;
				}

				div.icon::after {
					border-radius: 0 0 999px 999px;
					transform: translateY(-0.1rem);
				}
			}
		}

		div.side-button:hover div.close-icon-wrapper div.icon::before,
		div.side-button:hover div.close-icon-wrapper div.icon::after {
			border-radius: 999px;
		}

		div.side-button:hover div.close-icon-wrapper div.icon::before {
			transform: rotate(15deg) translateY(0.34rem);
		}

		div.side-button:hover div.close-icon-wrapper div.icon::after {
			transform: rotate(-15deg) translateY(-0.34rem);
		}

		div.side-button:hover div.close-icon-wrapper div.icon.closed::before {
			transform: rotate(-15deg) translateY(0.34rem);
		}

		div.side-button:hover div.close-icon-wrapper div.icon.closed::after {
			transform: rotate(15deg) translateY(-0.34rem);
		}
	}

	div.sidebar-wrapper.expanded {
		max-width: 15rem;
	}
</style>
