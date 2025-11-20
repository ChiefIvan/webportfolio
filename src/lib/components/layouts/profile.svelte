<script>
	import userIcon from '$lib/assets/img/user-icon.webp';
	import Button from '../shared/button.svelte';
	import Anchor from '../shared/anchor.svelte';

	let isProfileExpanded = $state(false);

	const profileExpand = (e) => {
		isProfileExpanded = !isProfileExpanded;
	};
</script>

<div class="profile-wrapper">
	<Button ghost padding="0.1rem" onclick={profileExpand}>
		<img src={userIcon} alt="user" />
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

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
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
