<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import NavItem from '$lib/components/shared/navItem.svelte';
	import Anchor from '$lib/components/shared/anchor.svelte';
	import PageTitle from '$lib/components/shared/pageTitle.svelte';
	const props = $props();

	const settingsPathname = '/admin/settings';

	onMount(() => {
		goto(`${settingsPathname}/manage-profile`);
	});
</script>

<div class="settings-wrapper">
	<PageTitle text="Settings" borderColor="orangered"></PageTitle>
	<nav>
		<ul>
			<NavItem>
				<Anchor nav link={`${settingsPathname}/manage-profile`}>Manage Profile</Anchor>
			</NavItem>
			<NavItem>
				<Anchor nav link={`${settingsPathname}/site-settings`}>Site Settings</Anchor>
			</NavItem>
		</ul>
	</nav>
</div>

<style>
	nav {
		margin-top: 2rem;

		ul {
			margin-left: 1rem;
			display: flex;
			flex-direction: column;
			row-gap: 1rem;
		}
	}
</style>
