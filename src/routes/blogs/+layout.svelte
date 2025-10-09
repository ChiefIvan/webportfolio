<script>
	import { page } from '$app/stores';

	import Anchor from '$lib/components/shared/anchor.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import Calendar from '$lib/components/icons/calendar.svelte';
	import Dropdown from '$lib/components/icons/dropdown.svelte';
	import DropdownIcon from '$lib/components/icons/dropdown.svelte';
	import MobileDev from '$lib/assets/mobile_development.jpg';
	import More from '$lib/assets/more.jpg';
	import SubDashboard from '$lib/components/shared/subDashboard.svelte';

	const { data, children } = $props();
</script>

<svelte:head><title>Ban | Blogs</title></svelte:head>

{#if children}
	{@render children({ key: $page.url.pathname })}
{/if}

<SubDashboard title="My Blogs">
	<div class="main-filters">
		<Button primary radius="0.5rem" padding="0.2rem 1rem" onclick={() => {}}>
			<span> Category </span>
			<DropdownIcon></DropdownIcon>
		</Button>
		<Button primary radius="0.5rem" padding="0.2rem 1rem" onclick={() => {}}>
			<span> Newest </span>
			<DropdownIcon></DropdownIcon>
		</Button>
	</div>
</SubDashboard>

{#each data.blogs as blog (blog)}
	<div class="blog-wrapper">
		<div class="blog-content">
			<div class="img-wrapper">
				<img src={MobileDev} alt="" />
			</div>
			<div class="contents">
				<div class="date-wrapper">
					<Calendar />
					<span>{blog.createdAt}</span>
				</div>
				<h4>{blog.title}</h4>
				<div class="tags">
					{#each blog.tags as tag (tag)}
						<span>#{tag}</span>
					{/each}
				</div>
				<p>{blog.intro}</p>
			</div>
			<div class="link-wrapper">
				<Anchor nav link={'/blogs' + (blog.link || '')}>
					<pre>Read more  ⟶</pre>
				</Anchor>
			</div>
		</div>
	</div>
{/each}

<style>
	div.main-filters {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		column-gap: 0.5rem;
		margin-bottom: 1rem;

		@media (max-width: 576px) {
			justify-content: center;
			flex-wrap: wrap;
			row-gap: 0.5rem;
		}
	}

	div.blog-wrapper {
		padding-inline: 1rem;
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-theme-color-2);

		@media (max-width: 576px) {
			padding-inline: 0;
		}

		div.blog-content {
			position: relative;
			display: flex;
			margin-block: 1rem;
			gap: 1.5rem;
			height: 16rem;

			@media (max-width: 576px) {
				height: 30rem;
				flex-direction: column;
			}

			div.img-wrapper {
				border-radius: 2rem;
				height: inherit;

				@media (max-width: 576px) {
					height: auto;
				}

				img {
					height: inherit;
					aspect-ratio: 16 / 9;
					object-fit: cover;
					border-radius: inherit;

					@media (max-width: 1024px) {
						aspect-ratio: 1 / 1;
					}

					@media (max-width: 576px) {
						aspect-ratio: 16 / 9;
						height: auto;
						max-width: 100%;
					}
				}
			}

			div.contents {
				-webkit-mask: linear-gradient(white 25%, transparent);
				mask: linear-gradient(white 25%, transparent);
				overflow: hidden;

				div.date-wrapper {
					display: flex;
					column-gap: 0.5rem;
					align-items: center;
					color: var(--light-theme-color-5);

					span {
						font-size: 0.8rem;
						font-style: italic;
					}
				}

				h4 {
					font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
					font-size: 1.3rem;
					color: var(--dark-theme-color-5);
					letter-spacing: -0.05rem;
					margin-block: 0.6rem;
				}

				div.tags {
					display: flex;
					column-gap: 0.5rem;
					margin-bottom: 0.5rem;

					span {
						background-color: var(--light-theme-color-2);
						color: var(--light-theme-color-5);
						padding: 0.1rem 0.4rem;
						border-radius: 0.3rem;
						font-size: 0.8rem;
					}
				}

				p {
					color: var(--light-theme-color-6);
					/* text-align: justify; */
				}
			}

			div.link-wrapper {
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}
</style>
