<script>
	import Header from '$lib/components/layouts/header.svelte';
	import Anchor from '$lib/components/shared/anchor.svelte';

	const props = $props();
</script>

<Header admin={true}></Header>

{@render props.children()}
