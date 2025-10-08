<script>
	import { page } from '$app/stores';

	const props = $props();
</script>

<a
	class:isScreenSmall={props.isScreenSmall}
	onclick={props.onclick}
	class:active={$page.url.pathname === props.link ||
		$page.url.pathname.startsWith(props.link + '/')}
	class:nav={props.nav}
	href={props.link}
	data-sveltekit-prefetch
>
	{#if props.isScreenSmall && props.icon}
		{@render props.icon()}
	{/if}
	{@render props.children()}
</a>

<style>
	a {
		display: inline-block;
		text-decoration: none;
		font-weight: 600;
		align-content: center;
		height: inherit;
		border-bottom: 2px solid transparent;
		transition: border-color 300ms;
	}

	a.nav:hover {
		border-color: var(--light-theme-color-2);
		cursor: pointer;
	}

	a.active {
		border-color: var(--dark-theme-color-6);
	}

	a.nav.isScreenSmall {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
		border-bottom: 1px solid var(--light-theme-color-2);
		padding-inline: 1rem;
		width: 100%;
		color: var(--light-theme-color-6);
		font-weight: 800;
		letter-spacing: -0.03rem;
	}

	a.isScreenSmall.active {
		color: var(--dark-theme-color-6);
		background-color: var(--light-theme-color-2);
		border-radius: 0.5rem;
	}

	a.isScreenSmall:hover {
		background-color: var(--light-theme-color-2);
	}
</style>
