<script>
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	import userIcon from '$lib/assets/img/user-icon.webp';
	import Button from '../shared/button.svelte';
	import Github from '../icons/github.svelte';
	import Anchor from '../shared/anchor.svelte';

	const session = $page.data.session;
	const imgURL = $state(session.user.image ? session.user.image : userIcon);

	let isProfileExpanded = $state(false);

	const profileExpand = (e) => {
		isProfileExpanded = !isProfileExpanded;
	};
</script>

<div class="profile-wrapper">
	<Button ghost padding="0.1rem" onclick={profileExpand}>
		<div class="image-wrapper">
			<img src={imgURL} alt="user" />
		</div>
	</Button>
	{#if isProfileExpanded}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="profile-overlay"
			onclick={() => (isProfileExpanded = false)}
			aria-label="Close profile overlay"
		>
			<div class="image-wrapper expanded">
				<img src={imgURL} alt="user" />
			</div>
			<div class="name-wrapper">
				<h2>Hello, {session.user.name ? session.user.name : 'User'}!</h2>
				{#if session.user.email}
					<p>{session.user.email}</p>
				{/if}
			</div>
			<ul>
				<Anchor link="/admin/settings/manage-profile">Manage your Profile</Anchor>
			</ul>
			<Button
				danger
				width="100%"
				gap="0.5rem"
				padding="0.2rem 2rem"
				onclick={() => signOut({ callbackUrl: '/admin/auth/login' })}
			>
				<Github></Github>
				Sign Out
			</Button>
		</div>
	{/if}
</div>

<style>
	div.profile-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.6rem;
		height: 2.6rem;

		div.profile-overlay {
			padding: 1rem;
			width: 20rem;
			border-radius: 1rem;
			background-color: var(--light-theme-color-1);
			box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
			position: absolute;
			right: 0rem;
			top: 3.5rem;
			display: flex;
			align-items: center;
			flex-direction: column;

			div.image-wrapper {
				max-width: 12rem;
			}

			div.name-wrapper {
				text-align: center;
				margin: 1rem 0;

				h2 {
					font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
					font-size: 1.8rem;
					letter-spacing: -0.09rem;
					color: var(--dark-theme-color-5);
				}

				p {
					color: var(--light-theme-color-4);
				}
			}

			ul {
				width: 100%;
				text-align: center;
				margin-bottom: 0.5rem;
			}
		}
	}

	div.image-wrapper,
	div.profile-overlay div.image-wrapper {
		display: flex;
		align-items: center;
		width: inherit;
		border-radius: 50%;
		overflow: hidden;

		img {
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			border-radius: inherit;
		}
	}
</style>
