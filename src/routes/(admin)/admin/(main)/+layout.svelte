<script>
	import Header from '$lib/components/layouts/header.svelte';
	import Sidebar from '$lib/components/layouts/sidebar.svelte';
	import Profile from '$lib/components/layouts/profile.svelte';

	const props = $props();

	const navContents = [{ component: Profile }];
</script>

<div class="main-wrapper">
	<Sidebar></Sidebar>
	<div class="main">
		<Header admin={true} {navContents}></Header>
		<main>
			{@render props.children()}
		</main>
	</div>
</div>

<style>
	div.main-wrapper {
		position: relative;
		display: flex;

		div.main {
			flex: 1;

			main {
				padding-inline: 2.5rem;
			}
		}
	}
</style>
