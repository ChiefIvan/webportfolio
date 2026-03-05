<script>
	import Button from './button.svelte';
	import Delete from '../icons/delete.svelte';
	import Edit from '../icons/edit.svelte';
	import Drag from '../icons/drag.svelte';

	const { academics = [], canEdit = false, onedit, ondelete } = $props();
</script>

{#if academics.length}
	{#each academics as academic (academic.id)}
		<div class="wrapper" class:editable={canEdit}>
			<h3 class:disabled={!canEdit}>{academic.level}</h3>
			<span class:disabled={!canEdit}>:</span>
			<div class="edu-details-wrapper">
				<h4 class:disabled={!canEdit}>
					{academic.school}
					{#if academic.ongoing}
						<span>On - Going</span>
					{/if}
				</h4>
				{#if academic.degree}
					<p class:disabled={!canEdit}>
						{academic.degree}
						{#if academic.major}
							major in {academic.major}
						{/if}
					</p>
				{/if}
				<p class:disabled={!canEdit}>{academic.address}</p>
				<p class:disabled={!canEdit}>({academic.academicYear})</p>
			</div>
			{#if canEdit}
				<div class="icons-wrapper">
					<Button
						type="button"
						ghost
						padding="0"
						onclick={() => {
							onedit(academic);
						}}
					>
						<Edit height="20" width="20" />
					</Button>
					<Button type="button" ghost padding="0" onclick={() => ondelete(academic.id)}>
						<Delete />
					</Button>
					<Button type="button" outlined padding="0">
						<Drag />
					</Button>
				</div>
			{/if}
		</div>
	{/each}
{:else}
	<div class="data-wrapper">
		<p>No background available!</p>
	</div>
{/if}

<style>
	@media (max-width: 768px) {
		div.wrapper {
			padding-inline: 0 !important;
			gap: 3rem !important;
		}
	}

	@media (max-width: 576px) {
		div.wrapper {
			gap: 1rem !important;
		}
	}

	div.wrapper {
		padding-inline: 1rem;
		display: flex;
		column-gap: 5rem;
		position: relative;
		background-color: #fff;

		h3 {
			flex: 0.3;
			font-size: 1rem;
			font-style: italic;
			font-weight: 600;
			letter-spacing: -0.06rem;
			color: var(--light-theme-color-6);
		}

		span {
			font-weight: 900;
		}

		div.edu-details-wrapper {
			flex: 1;

			h4 {
				color: var(--light-theme-color-6);
				font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				font-size: 1.3rem;
				letter-spacing: -0.05rem;

				span {
					background-color: var(--light-theme-color-2);
					color: var(--light-theme-color-5);
					padding: 0.1rem 0.4rem;
					border-radius: 0.3rem;
					font-size: 0.8rem;
					font-style: italic;
				}
			}
		}

		p {
			color: var(--light-theme-color-6);
		}
	}

	div.wrapper.editable {
		cursor: pointer;
		padding: 1rem;
		margin: 1rem;
		border-radius: 0.5rem;
		border-radius: 1rem;

		div.icons-wrapper {
			align-items: center;
			justify-content: center;
			column-gap: 0.8rem;
			position: absolute;
			top: 1rem;
			right: 1rem;
			opacity: 0.7;
			display: none;
		}

		&:hover {
			/* background-color: var(--light-theme-color-1); */
			box-shadow: 0 3px 3px var(--light-theme-color-2);
		}

		&:hover > div.icons-wrapper {
			display: flex;
		}
	}

	h3.disabled,
	span.disabled,
	h4.disabled,
	p.disabled {
		color: var(--light-theme-color-3) !important;
	}
</style>
