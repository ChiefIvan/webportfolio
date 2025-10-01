<script>
	import Globe from '../icons/globe.svelte';
	import Email from '../icons/email.svelte';
	import Telephone from '../icons/telephone.svelte';
	import Anchor from '../shared/anchor.svelte';
	import Facebook from '../icons/facebook.svelte';
	import Github from '../icons/github.svelte';
	import Codewars from '../icons/codewars.svelte';
</script>

<footer id="footer">
	<div class="footer-content-wrapper">
		<div class="header-wrapper">
			<h2>Contact Me</h2>
			<div class="logo-wrapper">
				<Anchor link="https://www.facebook.com/Chief.Ivan">
					<Facebook></Facebook>
				</Anchor>
				<Anchor link="https://github.com/ChiefIvan">
					<Github></Github>
				</Anchor>
				<Anchor link="https://www.codewars.com/users/ChiefIvan">
					<Codewars></Codewars>
				</Anchor>
			</div>
		</div>
		<p>
			Based in Philippines, I work with English, Tagalog and Bisaya (Cebuano) speaking Teams to
			create accessible digital experiences and adopt inclusive practices. Want to work together?
		</p>
		<ul>
			<li>
				<Globe fill="#b8860b"></Globe>
				<Anchor link="https://ban.dev">https://ban.dev</Anchor>
			</li>
			<li>
				<Email fill="#b8860b"></Email>
				<Anchor link="mailto:ivandawang011@gmail.com">ivandawang011@gmail.com</Anchor>
			</li>
			<li>
				<Telephone fill="#b8860b"></Telephone>
				<Anchor link="tel:Mobile:0977 3150 922">(+63) 977 3150 922</Anchor>
			</li>
		</ul>
	</div>
</footer>

<style>
	footer {
		background-color: var(--dark-theme-color-5);

		div.footer-content-wrapper {
			margin-top: 4.5rem;
			padding-block: 3rem;

			div.header-wrapper {
				display: flex;
				justify-content: space-between;
				margin-bottom: 1rem;

				h2 {
					font-size: 2rem;
					color: yellow;
					font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
				}

				div.logo-wrapper {
					display: flex;
					column-gap: 0.5rem;
					align-items: center;
				}
			}

			p {
				font-size: 1rem;
				color: var(--light-theme-color-2);
				max-width: 30rem;
				width: 100%;
				margin-bottom: 2rem;
			}

			ul {
				margin-left: 2rem;

				li {
					margin-block: 0.5rem;
					display: flex;
					align-items: center;
					column-gap: 0.5rem;
				}
			}
		}
	}
</style>
