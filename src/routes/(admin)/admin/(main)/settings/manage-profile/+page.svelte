<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import Button from '$lib/components/shared/button.svelte';
	import UserIcon from '$lib/assets/img/user-icon.webp';
	import Input from '$lib/components/shared/input.svelte';

	const session = $page.data.session;

	let isInputDisabled = $state(true);
	let submitButtonTypeState = $state('button');

	let fullname = $state('');
	let email = $state('');
	let alias = $state('');
	let bio = $state('');
</script>

<svelte:head>
	<title>Manage Profile - Admin/Settings</title>
</svelte:head>

<div class="manage-profile-page">
	<form
		method="POST"
		use:enhance={() => {
			isInputDisabled = true;

			return async ({ result }) => {
				// Do NOT call update() → form is NEVER reset
				// update() is the thing that resets the form by default

				if (result.type === 'success') {
					console.log('User created, but inputs stay filled!');
					// maybe show a toast instead of redirecting
				}

				if (result.type === 'failure') {
					error = result.data?.error ?? 'Nope';
				}
			};
		}}
	>
		<section class="profile-section">
			<div class="profile-info-wrapper">
				<div class="image-wrapper">
					<img
						src={session.user.image ? session.user.image : UserIcon}
						alt="User Profile Icon"
						class="profile-icon"
					/>
				</div>
				<div class="basic-info">
					<h2>{session.user.name} <span>(Github)</span></h2>

					<p>
						{session.user.email}
						<span>(Github)</span>
					</p>
				</div>
			</div>
			<div class="button-wrapper">
				{#if !isInputDisabled}
					<Button type="button" padding="0.2rem 2rem" danger>Cancel</Button>
				{/if}
				{#if isInputDisabled}
					<Button
						type="button"
						onclick={() => (isInputDisabled = false)}
						padding="0.2rem 2rem"
						primary
					>
						Edit Profile
					</Button>
				{:else}
					<Button type="submit" padding="0.2rem 2rem" primary>Save Changes</Button>
				{/if}
			</div>
		</section>
		<section class="basic-info-wrapper">
			<h3>Basic Info</h3>
			<div class="input-wrapper">
				<Input
					required
					inputName="Name"
					type="text"
					disabled={isInputDisabled}
					oninput={(e) => (fullname = e.target.value)}
					inputValue={fullname}
				></Input>
				<Input
					required
					inputName="Alias"
					type="text"
					disabled={isInputDisabled}
					oninput={(e) => (alias = e.target.value)}
					inputValue={alias}
				></Input>
				<div class="email-input-wrapper">
					<div class="email-input">
						<Input
							required
							inputName="Email"
							type="email"
							disabled={isInputDisabled}
							oninput={(e) => (email = e.target.value)}
							inputValue={email}
						></Input>
					</div>
					{#if !isInputDisabled}
						<Button
							type="button"
							primary
							padding="0.2rem 2rem"
							onclick={() => (email = session.user.email)}
							backgroundColor="var(--dark-theme-color-5)">Use Github Email</Button
						>
					{/if}
				</div>
			</div>
			<h3>Bio</h3>
			<div class="textarea-wrapper">
				<Input
					textarea
					inputName="Let others know more about you..."
					type="text"
					disabled={isInputDisabled}
					oninput={(e) => (bio = e.target.value)}
					inputValue={bio}
				></Input>
			</div>
		</section>
	</form>
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
					width: 12rem;
					border-radius: 50%;
					overflow: hidden;

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

					h2,
					p {
						span {
							font-style: italic;
							color: var(--light-theme-color-6);
							font-family: 'Poppins', Arial, Helvetica, sans-serif;
							font-weight: 800;
							letter-spacing: 0;
							font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
						}
					}
				}
			}

			div.button-wrapper {
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
				flex: 1;
				column-gap: 1rem;
			}
		}

		section.basic-info-wrapper {
			h3 {
				font-size: 1.1rem;
				margin-top: 2rem;
				font-style: italic;
				font-weight: 600;
				letter-spacing: -0.06rem;
				color: var(--light-theme-color-6);
			}

			div.input-wrapper {
				margin-top: 1rem;
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: 1.5rem;
				column-gap: 5rem;

				div.email-input-wrapper {
					display: flex;
					align-items: center;
					column-gap: 5rem;
					grid-column: span 2;

					div.email-input {
						flex: 1;
					}
				}
			}

			div.textarea-wrapper {
				margin-top: 1.5rem;
			}
		}
	}
</style>
