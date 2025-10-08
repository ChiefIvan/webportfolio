<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { focusTrap } from '$lib/actions/focusTrap.js';

	const props = $props();

	const handleclick = () => {
		document.body.classList.remove('no-scroll');
	};

	onMount(() => {
		document.body.classList.add('no-scroll');
	});
</script>

<div class="overlay" in:fade={{ duration: 200 }} out:fade={{ duration: 200, delay: 500 }}></div>
<div
	class="content-wrapper"
	in:fly={{ x: 500, duration: 600, delay: 300 }}
	out:fly={{ x: 500, duration: 800 }}
	use:focusTrap
>
	<a href="/blogs" onclick={handleclick}>← Back to Blogs</a>
	<button>Hello</button>
	<h1>{props.data.params}</h1>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis suscipit ipsam velit quidem voluptatum
	at aliquid expedita cumque atque quas! Et accusamus explicabo est commodi. Obcaecati omnis porro illum.
	Nesciunt explicabo ab, consequatur doloremque libero, deleniti natus tempore sunt quisquam officiis
	laudantium aliquid id minima perspiciatis vero mollitia asperiores! Aut suscipit earum quas. Odit dolores
	et adipisci pariatur nam molestias omnis quae eligendi nulla repellendus a ea vitae est, id harum voluptatum
	beatae labore dolor magnam quam odio in quos esse. Numquam illo aspernatur consequuntur voluptatum
	sed earum ipsam rem, corporis amet eius quod quos reiciendis. Officia omnis voluptates veritatis illo
	rerum eaque minus laudantium ducimus architecto dignissimos, quis modi, animi autem ipsa atque! Doloribus
	sint laboriosam libero optio doloremque, quibusdam deleniti recusandae iste ea porro facilis voluptatibus
	sunt quam nemo rem eaque sapiente nulla neque delectus perspiciatis eveniet consequatur. Maiores quibusdam
	fugiat, distinctio, odio quaerat, nam deleniti pariatur sit sapiente atque veniam natus explicabo eligendi
	itaque dolores ipsam officia consectetur illo optio consequatur non at amet consequuntur. Perspiciatis
	aliquam adipisci laudantium impedit nulla perferendis saepe odio eligendi, vero doloribus excepturi,
	sint animi sunt ex tenetur? Deserunt, distinctio optio accusamus harum minima quos, mollitia quam officia
	iure inventore sint, debitis laborum cumque earum consequatur voluptates eius hic! Deleniti nemo consequatur
	beatae nesciunt ea vel quam deserunt in expedita? Laudantium tempora provident quos inventore autem
	a error ad magni eius eveniet! Laudantium nesciunt nihil quas possimus sit assumenda sint harum dignissimos
	reiciendis? Necessitatibus quod, nulla dolore architecto tenetur non velit soluta possimus eum culpa
	minus doloremque quo praesentium id repudiandae magni recusandae in fugit ea fuga earum voluptatem
	iure dolor optio. Maxime eius optio labore enim voluptatibus, unde a porro soluta quam? Accusamus ipsa
	rerum ad deserunt? Iure tempora, iste earum eaque nobis maiores excepturi magnam explicabo reprehenderit
	at. Quaerat optio numquam commodi. Voluptas facere perferendis dolore sequi modi nihil adipisci, repudiandae,
	tenetur earum impedit ipsum, obcaecati atque optio! Unde dolores illo, dolore suscipit omnis iste officiis
	ullam voluptatem quos nihil distinctio autem est voluptatibus esse sint consectetur amet alias obcaecati
	numquam mollitia cum! Officiis corporis, tempore recusandae unde nostrum sed. Sequi esse culpa impedit
	consequatur, animi maxime nesciunt ex aliquid facere laudantium obcaecati inventore praesentium veritatis
	tempore. Minima eaque ad quo pariatur veritatis, eveniet facere! Soluta vitae voluptatibus culpa inventore
	voluptatem, repellat voluptas quod optio, distinctio vel blanditiis eveniet quaerat sunt similique
	fugit nam quae. Non eaque commodi optio officia repellendus laudantium architecto itaque vitae repellat
	consectetur, nobis labore incidunt aliquam soluta placeat at eos consequuntur consequatur ullam totam!
	Facilis, magnam. Excepturi obcaecati consectetur aliquam ipsum, quos debitis maiores. Voluptatem enim
	illo atque alias omnis amet accusamus vero deserunt similique aspernatur! Repellendus necessitatibus
	possimus facilis dolorem eos voluptates, temporibus dicta corporis quibusdam aut culpa laboriosam,
	repellat doloremque ex reiciendis aliquid quos corrupti in sed ratione quasi eum? Vero quidem minima
	repudiandae dolorem reprehenderit error ex rerum ad, temporibus quis aspernatur cum numquam inventore,
	est accusantium rem, hic laudantium iusto consequuntur! Laborum itaque at vel ad delectus pariatur
	tempore repellendus aspernatur?
</div>

<style>
	div.overlay {
		position: fixed;
		inset: 0;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0.8);

		@media (max-width: 768px) {
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
		}
	}

	div.content-wrapper {
		background-color: white;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		overflow: auto;
		padding: 1rem;
		width: 80%;
		color: var(--light-theme-color-6);
		border-bottom-left-radius: 1rem;
		border-top-left-radius: 1rem;

		@media (max-width: 768px) {
			width: 100%;
			border-bottom-left-radius: 0rem;
			border-top-left-radius: 0rem;
		}
	}
</style>
