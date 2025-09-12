<script>
	import Header from '$lib/components/layouts/header.svelte';
	import Footer from '$lib/components/layouts/footer.svelte';
	import Assistant from '$lib/components/layouts/assistant.svelte';

	const props = $props();
</script>

<Header></Header>

<main>
	<div class="main-content-wrapper">
		{@render props.children()}
	</div>
</main>

<Assistant></Assistant>

<Footer></Footer>
