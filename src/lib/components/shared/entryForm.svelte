<script>
	import Button from './button.svelte';
	import Add from '../icons/add.svelte';
	import Input from './input.svelte';
	import Select from './select.svelte';

	const props = $props();

	let createNewBackgroundData = $state(false);
	let backgroundData = $state({
		level: '',
		degree: '',
		major: '',
		school: '',
		address: '',
		academicYear: ''
	});

	const handleSave = () => {
		createNewBackgroundData = false;
		props.onrecieve(backgroundData);
		backgroundData = {
			level: '',
			degree: '',
			major: '',
			school: '',
			address: '',
			academicYear: ''
		};
	};

	const options = [
		{ value: 'Elementary' },
		{ value: 'High School' },
		{ value: 'Senior High School' },
		{ value: 'Associate Degree' },
		{ value: "Bachelor's Degree" },
		{ value: "Master's Degree" },
		{ value: 'Doctorate' }
	];
</script>

{#if createNewBackgroundData && !props.isInputDisabled}
	<div class="wrapper">
		<div class="input-wrapper">
			<div class="input">
				<Input
					required
					inputName="School"
					type="text"
					oninput={(e) => (backgroundData.school = e.target.value)}
				></Input>
				<Input
					required
					inputName="Address"
					type="text"
					oninput={(e) => (backgroundData.address = e.target.value)}
				></Input>
				<Input
					required
					inputName="Degree (Optional)"
					type="text"
					oninput={(e) => (backgroundData.degree = e.target.value)}
				></Input>
				<Input
					required
					inputName="Major (Optional)"
					type="text"
					oninput={(e) => (backgroundData.major = e.target.value)}
				></Input>
			</div>
			<div class="select-wrapper">
				<Select
					name="level"
					{options}
					value={backgroundData.level}
					onselect={(e) => (backgroundData.level = e.target.value)}
					disabled={props.isInputDisabled}
					placeholder="Select Level"
				></Select>
				<span>Specify in None: </span>
			</div>
			<Input
				required
				inputName="Academic Year"
				type="text"
				oninput={(e) => (backgroundData.academicYear = e.target.value)}
			></Input>
		</div>
		<div class="button-wrapper">
			<Button type="button" onclick={() => (createNewBackgroundData = false)} danger>Cancel</Button>
			<Button type="button" onclick={handleSave} primary backgroundColor="yellowgreen">Save</Button>
		</div>
	</div>
{/if}
{#if !createNewBackgroundData || props.isInputDisabled}
	<div class="add-button-wrapper">
		<Button
			outlined
			disabled={props.isInputDisabled}
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

<style>
	div.wrapper {
		div.input-wrapper {
			display: flex;
			flex-direction: column;
			row-gap: 1rem;

			div.input {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: 1.5rem;
				column-gap: 5rem;
			}
		}

		div.button-wrapper {
			display: flex;
			column-gap: 0.5rem;
			justify-content: flex-end;
			margin-top: 1.5rem;
		}
	}
</style>
