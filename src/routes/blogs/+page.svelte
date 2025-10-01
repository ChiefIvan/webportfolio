<script>
	import Anchor from '$lib/components/shared/anchor.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import Calendar from '$lib/components/icons/calendar.svelte';
	import Dropdown from '$lib/components/icons/dropdown.svelte';
	import MobileDev from '$lib/assets/mobile_development.jpg';
	import More from '$lib/assets/more.jpg';
</script>

<svelte:head><title>Ban | Blogs</title></svelte:head>

<!-- What's on my mind? -->

<div class="blog-wrapper">
	<div class="blog-content">
		<div class="img-wrapper">
			<img src={MobileDev} alt="" />
		</div>
		<div class="contents">
			<div class="date-wrapper">
				<Calendar />
				<span>20th Aug, 2024</span>
			</div>
			<h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
			<div class="tags">
				<span>#meaow</span>
				<span>#xiaomi</span>
				<span>#infinix</span>
			</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dignissimos consectetur quod
				esse iste omnis quasi ea quam eos. Dolorum dolor amet libero fuga quaerat cum, dicta quasi
				eaque hic repudiandae labore ducimus, ullam earum illo ratione doloremque fugit et sequi
				facere, quas culpa! Cumque at eaque laborum quam, quo rerum incidunt aspernatur architecto,
				totam repellat aut. Repudiandae voluptatem dolore aperiam modi dolorum Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Voluptate atque maxime fugit eius, natus expedita quaerat
				in impedit omnis, ad adipisci porro eveniet totam qui reprehenderit a nobis molestiae sequi
				laudantium facere deleniti ullam repellendus. Nemo odit perferendis ducimus in autem nostrum
				sit maxime aliquid officia exercitationem! Voluptatum, officia. Sit. Lorem ipsum dolor sit
				amet consectetur, adipisicing elit. Dolorem suscipit ad incidunt quisquam, accusamus illo
				ipsum explicabo qui doloremque cupiditate distinctio nesciunt aut ducimus modi officia
				exercitationem unde dolor illum perferendis et amet cum voluptatem libero ab? Nam quae
				explicabo eos deleniti temporibus dignissimos! Quisquam asperiores accusamus quam a.
				Consequatur, soluta amet non enim magni excepturi praesentium necessitatibus ratione minima
				nobis eos odio ab ipsum ea, quae veniam saepe, aliquid modi qui repudiandae esse dolore
				mollitia perspiciatis. Iure repudiandae alias eius nulla aliquid accusamus corporis
				dignissimos dolorem quas laudantium nesciunt, soluta totam ipsa non maiores commodi quis
				cumque, in id.
			</p>
		</div>
		<div class="link-wrapper">
			<Anchor link="#">
				<Button primary radius="50rem" padding="0.2rem 1rem">
					<span>Read more</span>
				</Button>
			</Anchor>
		</div>
	</div>
</div>
<div class="blog-wrapper">
	<div class="blog-content">
		<div class="img-wrapper">
			<img src={More} alt="" />
		</div>
		<div class="contents">
			<div class="date-wrapper">
				<Calendar />
				<span>07th Sep, 2025</span>
			</div>
			<h3>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat est sequi excepturi quos
				dolores maxime.
			</h3>
			<div class="tags">
				<span>#sample</span>
				<span>#another sample</span>
				<span>#and another sample</span>
			</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dignissimos consectetur quod
				esse iste omnis quasi ea quam eos. Dolorum dolor amet libero fuga quaerat cum, dicta quasi
				eaque hic repudiandae labore ducimus, ullam earum illo ratione doloremque fugit et sequi
				facere, quas culpa! Cumque at eaque laborum quam, quo rerum incidunt aspernatur architecto,
				totam repellat aut. Repudiandae voluptatem dolore aperiam modi dolorum Lorem ipsum dolor sit
				amet consectetur adipisicing elit. Voluptate atque maxime fugit eius, natus expedita quaerat
				in impedit omnis, ad adipisci porro eveniet totam qui reprehenderit a nobis molestiae sequi
				laudantium facere deleniti ullam repellendus. Nemo odit perferendis ducimus in autem nostrum
				sit maxime aliquid officia exercitationem! Voluptatum, officia. Sit. Lorem ipsum dolor sit
				amet consectetur, adipisicing elit. Dolorem suscipit ad incidunt quisquam, accusamus illo
				ipsum explicabo qui doloremque cupiditate distinctio nesciunt aut ducimus modi officia
				exercitationem unde dolor illum perferendis et amet cum voluptatem libero ab? Nam quae
				explicabo eos deleniti temporibus dignissimos! Quisquam asperiores accusamus quam a.
				Consequatur, soluta amet non enim magni excepturi praesentium necessitatibus ratione minima
				nobis eos odio ab ipsum ea, quae veniam saepe, aliquid modi qui repudiandae esse dolore
				mollitia perspiciatis. Iure repudiandae alias eius nulla aliquid accusamus corporis
				dignissimos dolorem quas laudantium nesciunt, soluta totam ipsa non maiores commodi quis
				cumque, in id.
			</p>
		</div>
		<div class="link-wrapper">
			<Anchor link="#">
				<Button primary radius="50rem" padding="0.2rem 1rem">
					<span>Read more</span>
				</Button>
			</Anchor>
		</div>
	</div>
</div>

<style>
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
				height: 35rem;
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
					aspect-ratio: 1 / 1;
					object-fit: cover;
					border-radius: inherit;

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

				h3 {
					font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
					font-size: 1.5rem;
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
