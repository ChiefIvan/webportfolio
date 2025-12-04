<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import NavItem from '$lib/components/shared/navItem.svelte';
	import Anchor from '$lib/components/shared/anchor.svelte';
	import PageTitle from '$lib/components/shared/pageTitle.svelte';

	const props = $props();

	const settingsPathname = '/admin/settings';
</script>

<div class="settings-wrapper">
	<div class="nav">
		<PageTitle text="Settings" borderColor="orangered"></PageTitle>
		<nav>
			<ul>
				<NavItem>
					<Anchor nav link={`${settingsPathname}/manage-profile`}>Manage Profile</Anchor>
				</NavItem>
				<NavItem>
					<Anchor nav link={`${settingsPathname}/site-settings`}>Site Settings</Anchor>
				</NavItem>
				<NavItem>
					<Anchor nav link={`${settingsPathname}/notifications`}>Notifications</Anchor>
				</NavItem>
			</ul>
		</nav>
	</div>
	<div class="settings-content">
		{@render props.children()}
	</div>
</div>

<style>
	div.settings-wrapper {
		display: flex;
		gap: 5rem;
		padding: 1rem;
		position: relative;

		div.nav {
			position: sticky;
			top: 4.5rem;
			height: 80dvh;
			flex: 0 0 200px;
			border-right: 1px solid var(--light-theme-color-3);
			padding-right: 1rem;

			nav {
				margin-top: 2rem;

				ul {
					margin-left: 1rem;
					display: flex;
					flex-direction: column;
					row-gap: 1rem;
				}
			}
		}

		div.settings-content {
			flex: 1;
		}
	}
</style>
