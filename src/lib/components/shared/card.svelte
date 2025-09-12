<script>
	const props = $props();
</script>

<div class="wrapper" style={`height: ${props.description || 'auto'};`}>
	<div class="img-wrapper">
		<img src={props.src} alt="project img placeholder" />
	</div>
	<div class="content-wrapper">
		{#if props.title}
			<h3>{props.title}</h3>
		{/if}
		{#if props.description}
			<p>
				{props.description}
			</p>
		{/if}
	</div>
</div>

<style>
	div.wrapper {
		overflow: hidden;
		box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
		transition: all ease-in-out 300ms;
		border-radius: 3px;
		width: 100%;
		height: 100%;
		max-height: 24rem;
		background-color: var(--light-theme-color-1);

		&:hover {
			box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.041);
			cursor: pointer;
		}

		&:hover div.img-wrapper img {
			transform: scale(1.2);
		}

		div.img-wrapper {
			overflow: inherit;
			width: inherit;
			height: 15rem;

			img {
				width: inherit;
				height: inherit;
				object-fit: cover;
				transition: all ease-in-out 300ms;
			}
		}

		div.content-wrapper {
			padding: 1rem;

			h3 {
				font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				font-size: 1.3rem;
				color: var(--dark-theme-color-5);
				letter-spacing: -0.05rem;
				margin-bottom: 0.5rem;
			}

			p {
				color: var(--light-theme-color-6);
			}
		}
	}
</style>
