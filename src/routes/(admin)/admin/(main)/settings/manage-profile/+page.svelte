<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import Cropper from 'svelte-easy-crop';
	import Button from '$lib/components/shared/button.svelte';
	import UserIcon from '$lib/assets/img/user-icon.webp';
	import Input from '$lib/components/shared/input.svelte';
	import Edit from '$lib/components/icons/edit.svelte';
	import Add from '$lib/components/icons/add.svelte';
	import EntryForm from '$src/lib/components/shared/entryForm.svelte';
	import Acad from '$src/lib/components/shared/acad.svelte';
	import Select from '$src/lib/components/shared/select.svelte';
	import Modal from '$src/lib/components/shared/modal.svelte';
	import Warning from '$src/lib/components/icons/warning.svelte';
	import PhotoChange from '$src/lib/components/layouts/photoChange.svelte';

	const { log } = console;
	const props = $props();
	const user = $derived(props.data?.user ?? {});
	const session = $page.data.session;
	const options = [
		{ value: 'Elementary' },
		{ value: 'High School' },
		{ value: 'Senior High School' },
		{ value: 'Associate Degree' },
		{ value: "Bachelor's Degree" },
		{ value: "Master's Degree" },
		{ value: 'Doctorate' }
	];

	let isInputDisabled = $state(true);
	let isOpenImgEdit = $state(false);
	let isEduBackOpen = $state(false);
	let createNewBackgroundData = $state(false);
	let createNewExpData = $state(false);
	let openModal = $state(false);
	let itemId = $state(0);
	let submitButtonTypeState = $state('button');
	let academics = $derived(user.academics ?? []);
	let academic = $state({});
	let expData = $state({ expData: [{}] });
	let cropState = $state({ x: 0, y: 0 });
	let zoomState = $state(1);
	let fileData = $state(null);
	let base64String = $state('');
	let inputElements = $state([]);
	let digits = $state(['', '', '', '', '', '', '', '']);

	let name = $derived(user.name ?? '');
	let email = $derived(user.email ?? '');
	let alias = $derived(user.alias ?? '');
	let bio = $derived(user.bio ?? '');

	const join = (arrDigits) => {
		let academicYear = arrDigits.join('');
		academicYear = academicYear.slice(0, 4) + '-' + academicYear.slice(4, 8);
		return academicYear;
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

	function handleInput(e, index) {
		const value = e.target.value;

		digits[index] = value.slice(-1);

		if (digits[index] && index < 7) {
			inputElements[index + 1].focus();
		}
	}

	function handleKeyDown(e, index) {
		if (e.key === 'Backspace' && !digits[index] && index > 0) {
			inputElements[index - 1].focus();
		}
	}
</script>

<svelte:head>
	<title>Manage Profile - Admin/Settings</title>
</svelte:head>

{#if isOpenImgEdit}
	<form method="POST" action="?/changeProfilePhoto" enctype="multipart/form-data" use:enhance>
		<PhotoChange></PhotoChange>
	</form>
{/if}

{#if openModal}
	<form
		method="POST"
		action="?/deleteAcademic"
		use:enhance={({ formData }) => {
			formData.set('id', itemId);
			openModal = false;
			itemId = 0;

			return async ({ result }) => {
				if (result.type == 'success') {
					academics = academics.filter((item) => item.id != result.data.id);
				}
			};
		}}
	>
		<Modal
			description={`Are you sure you want to delete?: `}
			itemName={`Academic info ${itemId}`}
			Icon={Warning}
			proceedName="Delete"
			proceedButtonType="submit"
			handleAbort={() => {
				openModal = false;
				itemId = 0;
			}}
		></Modal>
	</form>
{/if}

<div class="wrapper">
	<form
		method="POST"
		action="?/saveProfile"
		use:enhance={() => {
			isInputDisabled = true;

			return async ({ result }) => {
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
				<div class="basic-info-wrapper">
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
					<Button type="button" onclick={handleReset} danger>Cancel</Button>
				{/if}
				{#if isInputDisabled}
					<Button type="button" onclick={() => (isInputDisabled = false)} primary>
						Edit Profile
					</Button>
				{:else}
					<Button type="submit" primary backgroundColor="yellowgreen">Save Changes</Button>
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
						inputName="Admin Email"
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
	</form>
	<form
		method="POST"
		action="?/saveAcdemicInfo"
		use:enhance={({ formData }) => {
			formData.set('academicYear', join(digits));
			formData.set(
				'id',
				academic.id ? academic.id : academics.length ? academics[academics.length - 1].id + 1 : 1
			);
			academic = {};
			digits = ['', '', '', '', '', '', '', ''];
			createNewBackgroundData = false;

			return async ({ result }) => {
				if (result.type === 'success') {
					const data = result.data.updated;
					const acadExists = academics.find((a) => a.id == data.id);
					if (acadExists) {
						Object.assign(acadExists, data);
					} else {
						academics = [...academics, data].sort((a, b) => a.id - b.id);
					}
				}
			};
		}}
	>
		<section class="section-wrapper wrapper">
			<h3>Educational Background</h3>
			{#if academics.length}
				<div class="acad-wrapper">
					<Acad
						canEdit={!isInputDisabled}
						{academics}
						onedit={(data) => {
							academic = {};
							academic.school = data.school;
							academic.address = data.address;
							academic.degree = data.degree;
							academic.major = data.major;
							academic.level = data.level;
							academic.id = data.id;
							digits = ['', '', '', '', '', '', '', ''];
							digits = data.academicYear.split('-').join('').split('');
							createNewBackgroundData = true;
						}}
						ondelete={(id) => {
							openModal = true;
							itemId = id;
							log(id);
						}}
					/>
				</div>
			{/if}
			{#if createNewBackgroundData && !isInputDisabled}
				<div class="academic-form-wrapper">
					<div class="academic-form">
						<div class="input">
							<Input
								required
								inputName="School"
								type="text"
								inputValue={academic.school ?? ''}
								oninput={(e) => (academic.school = e.target.value)}
							></Input>
							<Input
								required
								inputName="Address"
								type="text"
								inputValue={academic.address ?? ''}
								oninput={(e) => (academic.address = e.target.value)}
							></Input>
							<Input
								inputName="Degree (Optional)"
								type="text"
								inputValue={academic.degree ?? ''}
								oninput={(e) => (academic.degree = e.target.value)}
							></Input>
							<Input
								inputName="Major (Optional)"
								type="text"
								inputValue={academic.major ?? ''}
								oninput={(e) => (academic.major = e.target.value)}
							></Input>
						</div>
						<div class="select-wrapper">
							<Select
								name="level"
								{options}
								selected={academic.level}
								onclick={(e) => (academic.level = e.target.value)}
								disabled={props.isInputDisabled}
								placeholder="Select Level"
							></Select>
						</div>
						<div class="year-input-wrapper">
							<label for="year">Academic Year</label>
							<div class="year-input">
								{#each digits as digit, index}
									{#if index === 4}
										<span>-</span>
									{/if}
									<input
										class="year-input"
										id={index + 1}
										type="number"
										min="0"
										max="9"
										bind:value={digits[index]}
										bind:this={inputElements[index]}
										oninput={(e) => handleInput(e, index)}
										onkeydown={(e) => handleKeyDown(e, index)}
									/>
								{/each}
							</div>
						</div>
						<div class="checkbox-wrapper">
							<Input
								inputName="On-Going"
								inputType="checkbox"
								checked={academic.ongoing}
								oninput={(e) => (academic.ongoing = e.target.checked)}
							></Input>
						</div>
					</div>
					<div class="button-wrapper">
						<Button
							type="button"
							onclick={() => {
								createNewBackgroundData = false;
								academic = {};
								digits = ['', '', '', '', '', '', '', ''];
							}}
							danger>Cancel</Button
						>
						<Button type="submit" primary backgroundColor="yellowgreen">Save</Button>
					</div>
				</div>
			{/if}
			{#if !createNewBackgroundData || isInputDisabled}
				<div class="add-button-wrapper">
					<Button
						outlined
						disabled={isInputDisabled}
						onclick={() => (createNewBackgroundData = true)}
						type="button"
						width="100%"
						padding="0.5rem 0"
						radius="0.5rem"
					>
						<Add></Add>
					</Button>
				</div>
			{/if}
		</section>
	</form>
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
</div>

<style>
	div.wrapper {
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
				align-items: flex-end;

				div.image-wrapper {
					min-width: 10rem;
					max-width: 15rem;
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

				div.basic-info-wrapper {
					flex: 1;

					h2 {
						font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
						font-size: 2.5rem;
						letter-spacing: -0.12rem;
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
				column-gap: 0.5rem;
			}
		}

		section.section-wrapper {
			border: 1px solid var(--light-theme-color-2);
			padding: 3rem 1rem 1rem 1rem;
			position: relative;
			margin-block: 3rem;
			border-radius: 1rem;

			h3 {
				font-size: 1.1rem;
				/* margin-top: 2rem; */
				position: absolute;
				top: -1rem;
				left: 1rem;
				padding-inline: 1rem;
				background-color: #fff;
				font-style: italic;
				font-weight: 600;
				letter-spacing: -0.06rem;
				color: var(--light-theme-color-6);
				margin-bottom: 1.5rem;
				font-weight: 800;
			}

			div.acad-wrapper {
				margin-bottom: 2rem;
				background-color: var(--light-theme-color-1);
				border-radius: 1.5rem;
			}

			div.input-wrapper {
				margin-top: 1rem;
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: 1.5rem;
				column-gap: 5rem;
			}

			div.academic-form-wrapper {
				div.academic-form {
					display: flex;
					flex-direction: column;
					row-gap: 1rem;

					div.input {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
						gap: 1.5rem;
						column-gap: 5rem;
					}

					div.year-input-wrapper {
						label {
							margin-inline: 0.5rem;
							font-weight: 700;
							color: var(--light-theme-color-6);
						}

						div.year-input {
							margin-top: 0.5rem;
							display: flex;
							align-items: center;
							column-gap: 0.25rem;

							input {
								width: 4rem;
								padding: 0.5rem;
								border: 1px solid var(--light-theme-color-3);
								border-radius: 0.5rem;
								text-align: center;

								&:focus {
									border-color: var(--dark-theme-color-6);
									outline: none;
								}
							}
						}
					}

					div.checkbox-wrapper {
						margin-top: 1.5rem;
					}
				}

				div.button-wrapper {
					display: flex;
					column-gap: 0.5rem;
					justify-content: flex-end;
					margin-top: 1.5rem;
				}
			}
		}

		section.section-wrapper.wrapper {
			display: flex;
			flex-direction: column;
			/* row-gap: 1.5rem; */
		}
	}
</style>
