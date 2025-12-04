<script>
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	import userIcon from '$lib/assets/img/user-icon.webp';
	import Button from '../shared/button.svelte';
	import Github from '../icons/github.svelte';
	import Anchor from '../shared/anchor.svelte';

	const session = $page.data.session;

	let isProfileExpanded = $state(false);

	const profileExpand = (e) => {
		isProfileExpanded = !isProfileExpanded;
	};
</script>

<div class="profile-wrapper">
	<Button ghost padding="0.1rem" onclick={profileExpand}>
		<div class="image-wrapper">
			<img src={session.user.image ? session.user.image : userIcon} alt="user" />
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
			<Anchor ghost link="/admin/settings/manage-profile">My Profile</Anchor>
			<Button
				danger
				gap="0.5rem"
				padding="0.2rem 2rem"
				onclick={() => signOut({ callbackUrl: '/admin/auth/login' })}
			>
				<Github></Github>
				Logout
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

		div.image-wrapper {
			display: flex;
			align-items: center;
			width: inherit;
			border-radius: 50%;
			overflow: hidden;

			img {
				max-width: 100%;
				aspect-ratio: 1 / 1;
				object-fit: cover;
				border-radius: inherit;
			}
		}

		div.profile-overlay {
			width: 25rem;
			height: 25rem;
			border-radius: 1rem;
			background-color: var(--light-theme-color-1);

			position: absolute;
			right: 0rem;
			top: 3.5rem;
		}
	}
</style>
