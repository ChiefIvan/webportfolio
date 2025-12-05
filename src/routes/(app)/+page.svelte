<script>
	import { page } from '$app/stores';
	import { domSize } from '$lib/domSize';
	import { onDestroy } from 'svelte';

	import UserIcon from '$lib/assets/img/user-icon.webp';
	import Card from '$lib/components/shared/card.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import MobileDev from '$lib/assets/img/mobile_development.jpg';
	import WebDev from '$lib/assets/img/web_development.jpg';
	import More from '$lib/assets/img/more.jpg';
	import CardWrapper from '$lib/components/layouts/cardWrapper.svelte';
	import Dropdown from '$lib/components/icons/dropdown.svelte';

	let size = $state();
	let isOffersExpanded = $state(false);

	const props = $props();
	const user = props.data.user;
	const session = $page.data.session;
	const cardItems = [
		{
			src: MobileDev,
			title: 'Designing',
			description: 'Crafting unique designs tailored to your needs.'
		},
		{
			src: WebDev,
			title: 'Programming',
			description: 'Building innovative apps for a seamless digital experience.'
		},
		{
			src: More,
			title: 'And More...',
			description: 'Delivering robust solutions for all your projects.'
		}
	];

	const unsubscibe = domSize.subscribe((v) => (size = v));
	onDestroy(unsubscibe);

	const scrollToFooter = () => {
		const element = document.getElementById('footer');

		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const offersExpandHandler = () => {
		isOffersExpanded = !isOffersExpanded;
	};
</script>

<svelte:head>
	<title>Ban</title>
</svelte:head>

<section class="section-1">
	<div class="hero-wrapper">
		<div class="circle">
			<img src={user.img ?? UserIcon} alt="" />
		</div>
		<div class="info-wrapper iw1">
			<h1>{user.name}</h1>
			<p>({user.alias})</p>
		</div>
		<div class="info-wrapper iw2">
			<p>I'm a Software Developer and Designer specializing User Experience and Performance</p>
			<div class="button-wrapper">
				<Button primary onclick={scrollToFooter} radius="2rem">Contact Me</Button>
			</div>
		</div>
	</div>
</section>
<section class="section-2">
	<h2>BE MY CLIENT TODAY</h2>
	<p>The Services and Offers I Provide to My Clients,</p>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class:expanded={isOffersExpanded} class="offers-wrapper">
		<CardWrapper default {cardItems} columns="3"></CardWrapper>
	</div>
	{#if size.width < 576}
		<div class:is-expanded={isOffersExpanded} class="button-wrapper">
			<Button ghost onclick={offersExpandHandler}>
				<Dropdown></Dropdown>
			</Button>
		</div>
	{/if}
</section>

<style>
	@media (max-width: 1024px) {
		section {
			div.hero-wrapper {
				div.iw1 {
					right: -15rem !important;
				}

				div.iw2 {
					left: -15rem !important;
				}
			}
		}
	}

	@media (max-width: 768px) {
		section {
			div.hero-wrapper {
				max-width: none !important;
				display: grid !important;
				grid-template-columns: 1fr 1fr;
				column-gap: 2rem;

				div.circle {
					align-self: center;
					grid-column: 1 / 2;
					grid-row: span 2 / span 2;
				}

				div.info-wrapper {
					position: static !important;
					padding-block: 1rem;
					padding-inline: 1rem;
					max-width: inherit !important;
				}

				div.iw1 {
					grid-column: 2 / 3;
					grid-row: 1 / 2;
					align-self: end;

					h1 {
						text-align: start !important;
					}

					p {
						position: static !important;
					}
				}

				div.iw2 {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
					align-self: start;
					border: none !important;

					p {
						max-width: inherit !important;
					}

					div.button-wrapper {
						margin-top: 0.5rem !important;
						position: static !important;
					}
				}
			}
		}
	}

	@media (max-width: 576px) {
		section {
			margin-top: 2rem !important;

			div.hero-wrapper {
				display: flex !important;
				flex-direction: column;
				padding: 1rem;

				div.iw1 {
					display: flex;
					align-items: center;
					flex-direction: column;
				}

				div.iw2 {
					text-align: center;

					div.button-wrapper {
						display: inline-block;
					}
				}
			}
		}
	}

	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes spin {
		from {
			--angle: 0deg;
		}
		to {
			--angle: 360deg;
		}
	}

	section {
		display: flex;
		align-items: center;
		margin-top: 4.5rem;
		margin-inline: auto;
		width: 100%;

		div.hero-wrapper {
			max-width: 25rem;
			height: auto;
			position: relative;

			div.circle {
				border-radius: 50%;
				border: 6px solid orangered;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				z-index: 1;

				img {
					max-width: 100%;
					height: inherit;
					aspect-ratio: 1 / 1;
					object-fit: cover;
					border-radius: inherit;
				}
			}

			div.circle::after {
				content: '';
				position: absolute;
				z-index: -1;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100%;
				height: 100%;
				background-image: conic-gradient(from var(--angle), blue, orangered, blue, orangered, blue);
				border-radius: 50%;
				animation: 3s spin linear infinite;
				filter: blur(1.5rem);
				opacity: 0.8;
			}

			div.info-wrapper {
				max-width: 20rem;
				width: 100%;
				position: absolute;
				border-bottom: 1px dotted var(--light-theme-color-6);
			}

			div.iw1 {
				top: 1rem;
				right: -18rem;

				h1,
				p {
					padding-right: 0.5rem;
				}

				h1 {
					text-align: end;
					padding-bottom: 0.5rem;
					font-size: clamp(1.8rem, calc(5vw + 1rem), 4rem);
					font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
					letter-spacing: -0.09rem;
					color: var(--dark-theme-color-5);
				}

				p {
					position: absolute;
					bottom: -2rem;
					right: 0;
				}
			}

			div.iw2 {
				bottom: 9rem;
				left: -18rem;

				p,
				div.button-wrapper {
					padding-left: 0.5rem;
				}

				p {
					max-width: 15rem;
					padding-bottom: 0.5rem;
					color: var(--light-theme-color-6);
				}

				div.button-wrapper {
					position: absolute;
					bottom: -3.5rem;
				}
			}
		}

		h2 {
			font-family: 'RobotoCondensed', Arial, Helvetica, sans-serif;
			font-size: 2rem;
			letter-spacing: -0.09rem;
			color: var(--dak-theme-color-5);
		}

		p {
			color: var(--light-theme-color-6);
		}

		div.offers-wrapper {
			width: inherit;
			margin-top: 2rem;

			@media (max-width: 576px) {
				height: 30rem;
				overflow: hidden;
				-webkit-mask: linear-gradient(white 25%, transparent);
				mask: linear-gradient(white 25%, transparent);
			}
		}

		div.offers-wrapper.expanded {
			@media (max-width: 576px) {
				height: auto;
				overflow: hidden;
				-webkit-mask: none;
				mask: none;
			}
		}
	}

	section.section-1 {
		justify-content: center;
	}

	section.section-2 {
		flex-direction: column;
		max-width: 50rem;

		div.button-wrapper.is-expanded {
			transform: rotate(180deg);
		}
	}
</style>
