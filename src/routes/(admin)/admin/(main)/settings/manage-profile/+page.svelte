<script>
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import Cropper from 'svelte-easy-crop';
	import Button from '$lib/components/shared/button.svelte';
	import UserIcon from '$lib/assets/img/user-icon.webp';
	import Input from '$lib/components/shared/input.svelte';
	import Edit from '$lib/components/icons/edit.svelte';
	import Add from '$lib/components/icons/add.svelte';

	const props = $props();
	const user = props.data.user;
	const session = $page.data.session;

	let isInputDisabled = $state(true);
	let isOpenImgEdit = $state(false);
	let isEduBackOpen = $state(false);
	let createNewBackgroundData = $state(false);
	let createNewExpData = $state(false);
	let submitButtonTypeState = $state('button');
	let backgroundData = $state({ backgroundData: [{}] });
	let expData = $state({ expData: [{}] });
	let cropState = $state({ x: 0, y: 0 });
	let zoomState = $state(1);
	let fileData = $state(null);
	let base64String = $state('');

	let name = $state(user.name ?? '');
	let email = $state(user.email ?? '');
	let alias = $state(user.alias ?? '');
	let bio = $state(user.bio ?? '');

	const handleCreate = (data) => {
		const key = Object.keys(data)[0];

		if (key === 'backgroundData') {
			createNewBackgroundData = true;
		} else {
			createNewExpData = true;
		}
	};

	const handleReset = () => {
		isInputDisabled = true;
		createNewBackgroundData = false;
		createNewExpData = false;

		name = user.name ?? '';
		email = user.email ?? '';
		alias = user.alias ?? '';
		bio = user.bio ?? '';
	};
</script>

<svelte:head>
	<title>Manage Profile - Admin/Settings</title>
</svelte:head>

<!-- {#if isOpenImgEdit}
	<div class="img-edit-modal-overlay">
		<div class="img-edit-modal">
			<h2>Edit Profile Image</h2>
			<Cropper
				image={session.user.image ? session.user.image : UserIcon}
				aspect={1}
				boundary={{ width: 300, height: 300 }}
				cropShape="round"
			></Cropper>
			<form action="">
				<input
					id="image_upload"
					name="User Image"
					bindfiles={fileData}
					onchange={handleImage}
					type="file"
					accept=".jpg"
				/>
			</form>
		</div>
	</div>
{/if} -->

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
					{#if !isInputDisabled}
						<div transition:fade={{ duration: 300 }} class="img-overlay">
							<Button
								onclick={() => (isOpenImgEdit = true)}
								type="button"
								padding="0.2rem 1rem"
								color="var(--light-theme-color-1)"
								ghost
							>
								<Edit></Edit>
							</Button>
						</div>
					{/if}
				</div>
				<div class="basic-info">
					<h2>
						{#if user.name}
							{user.name}
						{:else}
							{session.user.name}
							{#if session.provider}
								<span>
									({session.provider})
								</span>
							{/if}
						{/if}
					</h2>
					<p>
						{session.user.email}
						{#if session.provider}
							<span>
								({session.provider})
							</span>
						{/if}
					</p>
				</div>
			</div>
			<div class="button-wrapper">
				{#if !isInputDisabled}
					<Button type="button" padding="0.2rem 2rem" onclick={handleReset} danger>Cancel</Button>
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
		<section class="section-wrapper">
			<h3>Basic Info</h3>
			<div class="input-wrapper">
				<Input
					required
					inputName="Name"
					type="text"
					disabled={isInputDisabled}
					oninput={(e) => (name = e.target.value)}
					inputValue={name}
				></Input>
				<Input
					required
					inputName="Alias"
					type="text"
					disabled={isInputDisabled}
					oninput={(e) => (alias = e.target.value)}
					inputValue={alias}
				></Input>
				<div class="email-input">
					<Input
						required
						inputName="Email"
						type="email"
						disabled={true}
						oninput={(e) => (email = e.target.value)}
						inputValue={email}
					></Input>
				</div>
			</div>
		</section>
		<section class="section-wrapper">
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
		<section class="section-wrapper">
			<h3>Educational Background</h3>
			{#if createNewBackgroundData}
				<div class="new-data-wrapper">
					<Input required inputName="Level" type="text" oninput={(e) => (email = e.target.value)}
					></Input>
					<Input required inputName="Degree" type="text" oninput={(e) => (email = e.target.value)}
					></Input>
					<Input required inputName="School" type="text" oninput={(e) => (email = e.target.value)}
					></Input>
				</div>
			{/if}
			<div class="add-button-wrapper">
				<Button
					outlined
					disabled={isInputDisabled}
					onclick={() => handleCreate(backgroundData)}
					type="button"
					width="100%"
					padding="0.5rem 0"
				>
					<Add></Add>
				</Button>
			</div>
		</section>
		<section class="section-wrapper">
			<h3>Experiences</h3>
			{#if createNewExpData}
				<div class="new-data-wrapper">Hello from expData</div>
			{/if}
			<div class="add-button-wrapper">
				<Button
					outlined
					disabled={isInputDisabled}
					onclick={() => handleCreate(expData)}
					type="button"
					width="100%"
					padding="0.5rem 0"
				>
					<Add></Add>
				</Button>
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
					min-width: 8rem;
					max-width: 12rem;
					border-radius: 50%;
					overflow: hidden;
					position: relative;
					display: flex;
					align-items: center;

					img {
						width: 100%;
						aspect-ratio: 1 / 1;
						object-fit: cover;
						border-radius: inherit;
					}

					div.img-overlay {
						background-color: rgba(0, 0, 0, 0.5);
						backdrop-filter: blur(5px);
						-webkit-backdrop-filter: blur(5px);
						position: absolute;
						inset: 0;
						display: flex;
						align-items: center;
						column-gap: 1rem;
						justify-content: center;
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

		section.section-wrapper {
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
			}

			div.textarea-wrapper {
				margin-top: 1.5rem;
			}
		}
	}
</style>
