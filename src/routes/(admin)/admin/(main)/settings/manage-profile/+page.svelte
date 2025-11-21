<script>
	import { page } from '$app/stores';

	import Button from '$lib/components/shared/button.svelte';
	import UserIcon from '$lib/assets/img/user-icon.webp';
	import Input from '$lib/components/shared/input.svelte';

	const session = $page.data.session;
	console.log(session.user);
</script>

<svelte:head>
	<title>Manage Profile - Admin Settings</title>
</svelte:head>

<div class="manage-profile-page">
	<section class="profile-section">
		<div class="profile-info-wrapper">
			<div class="image-wrapper">
				<img src={UserIcon} alt="User Profile Icon" class="profile-icon" />
			</div>
			<div class="basic-info">
				<h2>Ivan P. Dawang (Ban)</h2>
				<p>{session.user.email}</p>
			</div>
		</div>
		<div class="button-wrapper">
			<Button padding="0.2rem 2rem" primary>Edit Profile</Button>
		</div>
	</section>
	<section class="basic-info-wrapper">
		<h3>Basic Info</h3>
	</section>
</div>

<style>
	div.manage-profile-page {
		section {
			margin-bottom: 0.5rem;
		}

		section.profile-section {
			display: flex;
			padding-bottom: 1rem;
			border-bottom: 1px solid var(--light-theme-color-2);

			div.profile-info-wrapper {
				display: flex;
				column-gap: 2rem;
				align-items: center;

				div.image-wrapper {
					width: 10rem;

					img {
						max-width: 100%;
						height: inherit;
						aspect-ratio: 1 / 1;
						object-fit: cover;
						border-radius: inherit;
					}
				}

				div.basic-info {
					flex: 1;

					h2 {
						font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
						font-size: 1.8rem;
						letter-spacing: -0.09rem;
						color: var(--dark-theme-color-5);
					}

					p {
						color: var(--light-theme-color-5);
					}
				}
			}

			div.button-wrapper {
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
				flex: 1;
			}
		}

		section.basic-info-wrapper {
			h3 {
				font-size: 1.1rem;
				font-style: italic;
				font-weight: 600;
				letter-spacing: -0.06rem;
				color: var(--light-theme-color-6);
			}
		}
	}
</style>
