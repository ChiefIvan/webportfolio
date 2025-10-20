<script>
	import Header from '$lib/components/layouts/header.svelte';
	import Footer from '$lib/components/layouts/footer.svelte';
	import Assistant from '$lib/components/layouts/assistant.svelte';
	import Anchor from '$lib/components/shared/anchor.svelte';
	import Home from '$lib/components/icons/home.svelte';
	import Background from '$lib/components/icons/background.svelte';
	import Projects from '$lib/components/icons/projects.svelte';
	import Blogs from '$lib/components/icons/blogs.svelte';

	const props = $props();

	const navContents = [
		{ component: Anchor, href: '/', icon: Home, text: 'Home' },
		{ component: Anchor, href: '/background', icon: Background, text: 'Background' },
		{ component: Anchor, href: '/projects', icon: Projects, text: 'Projects' },
		{ component: Anchor, href: '/blogs', icon: Blogs, text: 'Blogs' }
	];
</script>

<Header {navContents}></Header>

<main>
	<div class="main-content-wrapper">
		{@render props.children()}
	</div>
</main>

<Assistant></Assistant>

<Footer></Footer>
