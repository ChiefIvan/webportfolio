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
					<Anchor nav link={`${settingsPathname}/manage-files`}>Manage Files</Anchor>
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
		padding: 2rem;
		position: relative;
		column-gap: 5rem;

		div.nav {
			position: sticky;
			top: 6rem;
			height: 85dvh;
			flex: 0 0 200px;
			border-right: 1px solid var(--light-theme-color-2);

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
