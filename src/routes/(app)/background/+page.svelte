<script>
	import { tooltip } from '$lib/actions/tooltip';

	import Icon from '@iconify/svelte';
	import Accodion from '$lib/components/shared/accodion.svelte';
	import Table from '$lib/components/shared/table.svelte';
	import TableHead from '$lib/components/shared/tableHead.svelte';
	import TableItems from '$lib/components/shared/tableItems.svelte';
	import Javascript from '$lib/components/icons/javascript.svelte';
	import Svelte from '$lib/components/icons/svelte.svelte';
	import Mysql from '$lib/components/icons/mysql.svelte';
	import Canva from '$lib/components/icons/canva.svelte';
	import Chatgpt from '$lib/components/icons/chatgpt.svelte';
	import Python from '$lib/components/icons/python.svelte';
	import Flask from '$lib/components/icons/flask.svelte';
	import Postgres from '$lib/components/icons/postgres.svelte';
	import Adobe from '$lib/components/icons/adobe.svelte';
	import Perplexity from '$lib/components/icons/perplexity.svelte';
	import Java from '$lib/components/icons/java.svelte';
	import Django from '$lib/components/icons/django.svelte';
	import Csharp from '$lib/components/icons/csharp.svelte';
	import Flet from '$lib/components/icons/flet.svelte';
	import Kotlin from '$lib/components/icons/kotlin.svelte';
	import Pytorch from '$lib/components/icons/pytorch.svelte';
	import Grok from '$lib/components/icons/grok.svelte';
	import Html from '$lib/components/icons/html.svelte';
	import Css from '$lib/components/icons/css.svelte';
	import Icones from '$lib/components/icons/icones.svelte';

	const { log, error } = console;

	const props = $props();
	let user = props.data;
</script>

<svelte:head>
	<title>Ban | Background</title>
</svelte:head>

<div class="section-wrapper">
	<section>
		<h2>Personal Info</h2>
		<div class="personal-info-wrapper">
			<p>
				{#if user && user.bio}
					{user.bio}
				{:else}
					No bio available!
				{/if}
			</p>
		</div>
	</section>
	<section>
		<h2>Academic Background</h2>
		{#if user && user.academics}
			{#each user.academics as academic (academic)}
				<div class="personal-info-wrapper academic-info-wrapper">
					<h3>{academic.level}</h3>
					<span>:</span>
					<div class="edu-details-wrapper">
						<h4>{academic.school}</h4>
						{#if academic.degree}
							<p>{academic.degree}</p>
						{/if}
						<p>{academic.address}</p>
						<p>({academic.academicYear})</p>
					</div>
				</div>
			{/each}
		{:else}
			<div class="personal-info-wrapper">
				<p>No background available!</p>
			</div>
		{/if}
	</section>

	<section>
		<h2>Work Experiences At</h2>
		{#if user && user.experiences}
			{#each user.experiences as experience (experience)}
				<Accodion title={experience.title} isCurrent={experience.isCurrent}>
					<p class="accordion-content">
						{experience.description}
					</p>
				</Accodion>
			{/each}
		{:else}
			<div class="personal-info-wrapper">
				<p>No experiences available!</p>
			</div>
		{/if}
	</section>

	<section>
		<h2>Technology Stack</h2>
		<div class="table-wrapper">
			<Table>
				<thead>
					<TableHead>
						<th>Languages</th>
						<th>Frameworks</th>
						<th>Databases</th>
						<th>Design Tools</th>
						<th>AI Tools</th>
						<th>Basics</th>
					</TableHead>
				</thead>
				<tbody>
					<TableItems>
						<td use:tooltip={{ content: 'JavasScript (Expert)' }}> <Javascript /></td>
						<td use:tooltip={{ content: 'Svelte (Expert)/SvelteKit (Intermediate)' }}>
							<Svelte /></td
						>
						<td use:tooltip={{ content: 'MySQL (Expert)' }}> <Mysql /> </td>
						<td use:tooltip={{ content: 'Canva (Expert)' }}> <Canva /></td>
						<td use:tooltip={{ content: 'ChatGPT' }}> <Chatgpt /></td>
						<td use:tooltip={{ content: 'HTML' }}> <Html /></td>
					</TableItems>
					<TableItems>
						<td use:tooltip={{ content: 'Python (Expert)' }}> <Python /></td>
						<td use:tooltip={{ content: 'Flask (Expert)' }}> <Flask /></td>
						<td use:tooltip={{ content: 'Postgres (Beginner)' }}><Postgres /></td>
						<td use:tooltip={{ content: 'Adobe (Beginner)' }}><Adobe /></td>
						<td use:tooltip={{ content: 'Perplexity' }}><Perplexity /></td>
						<td use:tooltip={{ content: 'CSS' }}> <Css /></td>
					</TableItems>
					<TableItems>
						<td use:tooltip={{ content: 'Java (Intermediate)' }}><Java /></td>
						<td use:tooltip={{ content: 'Django (Intermediate)' }}><Django /></td>
						<td></td>
						<td use:tooltip={{ content: 'Icones' }}><Icones /></td>
						<td use:tooltip={{ content: 'Grok' }}><Grok /></td>
					</TableItems>
					<TableItems>
						<td use:tooltip={{ content: 'C# (Intermediate)' }}><Csharp /></td>
						<td use:tooltip={{ content: 'Flet (Expert)' }}><Flet /></td>
					</TableItems>
					<TableItems>
						<td></td>
						<td use:tooltip={{ content: 'Pytorch (Beginner)' }}><Pytorch /></td>
					</TableItems>
				</tbody>
			</Table>
		</div>
	</section>
</div>

<style>
	@media (max-width: 768px) {
		div.section-wrapper {
			section {
				div.personal-info-wrapper {
					padding-inline: 0 !important;
					gap: 3rem !important;
				}
			}
		}
	}

	@media (max-width: 576px) {
		div.section-wrapper {
			section {
				div.personal-info-wrapper {
					gap: 1rem !important;
				}
			}
		}
	}

	div.section-wrapper {
		section {
			margin-top: 3rem;

			h2 {
				font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				font-size: 1.8rem;
				letter-spacing: -0.09rem;
				color: var(--dark-theme-color-5);
				border-bottom: 1px solid var(--light-theme-color-2);
				padding-bottom: 1rem;
				margin-bottom: 1rem;
			}

			p.accordion-content {
				color: var(--light-theme-color-6);
				margin-bottom: 1rem;
			}

			div.personal-info-wrapper {
				padding-inline: 1rem;
				display: flex;
				column-gap: 5rem;

				p {
					color: var(--light-theme-color-6);
				}
			}

			div.academic-info-wrapper {
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
				}
			}

			h4,
			th {
				color: var(--light-theme-color-6);
				font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				font-size: 1.3rem;
				letter-spacing: -0.05rem;
			}

			th {
				font-family: 'Poppins';
				letter-spacing: -0.09rem !important;
				font-weight: 700;
				font-size: 1.1rem !important;
				padding-bottom: 2rem !important;
			}

			th,
			td {
				width: 1000px;
				padding-block: 0.2rem;
				text-align: center;
				min-width: 100px;
			}

			td:hover {
				transform: scale(1.1);
				cursor: pointer;
			}

			div.table-wrapper {
				display: block;
				overflow-x: auto;
				white-space: nowrap;
				padding-bottom: 1rem;
			}
		}
	}
</style>
