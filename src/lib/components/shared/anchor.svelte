<script>
	import { page } from '$app/stores';

	const props = $props();
</script>

<a
	class:isScreenSmall={props.isScreenSmall}
	class:admin={props.admin}
	onclick={props.onclick}
	class:active={$page.url.pathname === props.link ||
		$page.url.pathname.startsWith(props.link + '/')}
	class:nav={props.nav}
	class:ghost={props.ghost}
	href={props.link}
	data-sveltekit-prefetch
>
	{#if (props.admin || props.isScreenSmall) && props.icon}
		<div class="icon-wrapper">
			{@render props.icon()}
		</div>
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

		div.icon-wrapper {
			display: flex;
			align-items: center;
		}
	}

	a.ghost {
		display: block;
		text-decoration: none;
		border-bottom: none;
		font-weight: normal;
	}

	a.nav:hover {
		border-color: var(--light-theme-color-2);
		cursor: pointer;
	}

	a.active {
		border-color: var(--dark-theme-color-6);
	}

	a.nav.isScreenSmall,
	a.nav.admin {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		column-gap: 0.5rem;
	}

	a.nav.isScreenSmall {
		border-bottom: 1px solid var(--light-theme-color-2);
		padding-inline: 1rem;
		color: var(--light-theme-color-6);
		font-weight: 800;
		letter-spacing: -0.03rem;
	}

	a.nav.admin {
		transition: all ease-in-out 150ms;
		border-bottom: none;
		color: var(--light-theme-color-6);
		padding: 0.6rem 0.4rem;
		width: 100%;
		border-radius: 0.5rem;
	}

	a.isScreenSmall.active {
		color: var(--dark-theme-color-6);
		background-color: var(--light-theme-color-2);
		border-radius: 0.5rem;
	}

	a.nav.admin.active {
		color: #3890f4;
		background-color: var(--light-theme-color-2);
	}

	a.isScreenSmall.active {
		color: var(--dark-theme-color-6);
		background-color: var(--light-theme-color-2);
	}

	a.isScreenSmall:hover {
		background-color: var(--light-theme-color-2);
	}

	a.nav.admin:hover {
		background-color: #eaeaea;
	}
</style>
