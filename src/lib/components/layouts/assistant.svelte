<script>
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { autosize } from '$lib/autosize';

	import Button from '$lib/components/shared/button.svelte';
	import Message from '$lib/components/icons/sparkle.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import Spinner from '$lib/components/icons/spinner.svelte';
	import favicon from '$lib/assets/favicon.png';

	let textareaRef = $state();
	let ulRef = $state();
	let buttonRef = $state();
	let isLoading = $state(false);
	let isOpen = $state(false);
	let messages = $state([]);
	let userQuestion = $state('');

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			buttonRef.bindRef().click();
		}
	};

	const scrollToBottom = async () => {
		if (ulRef) {
			await tick();
			ulRef.scrollTo({ top: ulRef.scrollHeight, behavior: 'smooth' });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const question = userQuestion;
		userQuestion = '';

		if (textareaRef) {
			textareaRef.style.height = 'auto';
		}

		messages = [...messages, { sender: 'You', message: question }];
		scrollToBottom();

		isLoading = true;

		try {
			const response = await fetch('Open AI API URL', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer something',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: 'I you to be here',
					stream: false,
					messages: [
						{
							role: 'system',
							content: "You're an assistant"
						},
						{
							role: 'system',
							content: "Your master's name is Ivan"
						},
						{
							role: 'system',
							content: "You're only going to answer if the information is all about your master"
						},
						{
							role: 'user',
							content: question
						}
					]
				})
			});

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();
			messages = [...messages, { sender: 'Assistant', message: data.choices[0].message.content }];
			scrollToBottom();
		} catch (error) {
			console.error('Error:', error);
			messages = [
				...messages,
				{
					sender: 'Assistant',
					error: true,
					message: "I'm having trouble right now. Please try again later."
				}
			];
			scrollToBottom();
		} finally {
			isLoading = false;
		}
	};
</script>

<div class:expanded={isOpen} class="assistant-overlay">
	<div class="assistant-wrapper">
		{#if isOpen}
			<div class="message-wrapper">
				{#if messages.length}
					<div bind:this={ulRef} class="messages">
						<ul>
							{#each messages as message}
								{@const isUser = message.sender === 'You'}
								<li class:user={isUser}>
									<div class:user={isUser} class="content-wrapper">
										<h5>{message.sender}</h5>
										<p class:error={message.error}>{message.message}</p>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{:else}
					<div class="messages greet-wrapper">
						<img src={favicon} alt="" />
						<span> Hi!, let's talk. </span>
						<p>Do you have anything in mind?</p>
					</div>
				{/if}
				<form onsubmit={handleSubmit}>
					<div class="textarea-wrapper">
						<textarea
							id="textarea"
							placeholder=""
							bind:this={textareaRef}
							bind:value={userQuestion}
							use:autosize
							onkeydown={handleKeyDown}
							disabled={isLoading}
							required
						></textarea>
						<label for="textarea">Send a message...</label>
					</div>
					<Button
						bind:this={buttonRef}
						type="submit"
						primary
						disabled={isLoading}
						radius="50%"
						padding="0.5rem"
					>
						{#if isLoading}
							<Spinner minWidth="1.5rem"></Spinner>
						{:else}
							<Send></Send>
						{/if}
					</Button>
				</form>
			</div>
		{/if}

		<div class="button">
			<Button onclick={() => (isOpen = !isOpen)} custom radius="5rem" gap="0.5rem">
				<Message></Message>
				<span>Chat with Assistant</span>
			</Button>
		</div>
	</div>
</div>

<style>
	div.assistant-overlay {
		position: fixed;
		right: 0rem;
		bottom: 0rem;
		z-index: 999;
		display: flex;

		div.assistant-wrapper {
			display: flex;
			align-items: end;
			justify-content: end;
			flex-wrap: wrap;
			gap: 1rem;
			padding: 1rem;

			@media (max-width: 576px) {
				max-width: 40rem;
				width: 100%;
			}

			div.message-wrapper {
				padding: 0.5rem;
				height: 35rem;
				max-width: 40rem;
				width: 100%;
				border-radius: 1rem;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				row-gap: 1rem;
				box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

				div.messages {
					flex: 1 1 0%;
					scroll-behavior: smooth;
					overflow-y: auto;

					ul {
						li {
							display: flex;

							div.content-wrapper {
								padding: 1rem;

								h5 {
									color: var(--dark-theme-color-5);
								}

								p {
									color: var(--light-theme-color-6);
								}

								p.error {
									color: red;
								}
							}

							div.user {
								max-width: 60%;
								background-color: var(--light-theme-color-1);
								border-radius: 1rem 1rem 0 1rem;
							}
						}

						li.user {
							padding: 1rem;
							justify-content: flex-end;
						}
					}
				}
				div.greet-wrapper {
					align-content: center;
					text-align: center;

					img {
						width: 3rem;
						height: 3rem;
					}

					span {
						font-family: 'Poppins', sans-serif;
						font-size: 1.7rem;
						letter-spacing: -0.1rem;
						background-image: linear-gradient(to top right, #0053bd, orangered);
						background-clip: text;
						-webkit-background-clip: text;
						background-size: cover;
						color: transparent;
						padding-inline: 0.2rem;
						font-weight: 800;
					}
				}

				form {
					width: 100%;
					display: flex;
					align-items: flex-end;
					column-gap: 0.5rem;

					div.textarea-wrapper {
						position: relative;
						display: flex;
						width: inherit;
						z-index: 1;

						textarea,
						label {
							padding-inline: 0.5rem;
							color: var(--light-theme-color-6);
						}

						textarea {
							overflow: hidden;
							width: inherit;
							resize: none;
							padding-block: 0.5rem;
							scrollbar-width: none;
							border-radius: 0.5rem;
							background-color: transparent;
							border: 1px solid var(--light-theme-color-3);
							outline-color: var(--dark-theme-color-2);
							max-height: 10rem;
						}

						label {
							position: absolute;
							transition: all ease-in-out 200ms;
							top: 0.5rem;
							font-weight: 600;
							color: var(--light-theme-color-6);
							user-select: none;
							-webkit-user-select: none;
							z-index: -1;
						}

						label:hover {
							cursor: text;
						}
					}

					& div.textarea-wrapper:focus-within label,
					textarea:not(:placeholder-shown) + label {
						transform: translatey(-2rem);
						font-size: 0.7rem !important;
						/* margin-left: 0.2rem; */
					}
				}
			}

			span {
				display: block;
				align-content: center;
			}
		}
	}

	div.assistant-overlay.expanded {
		@media (max-width: 576px) {
			inset: 0;
			align-items: flex-end;
			justify-content: center;

			background-color: rgba(0, 0, 0, 0.8);
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
		}
	}
</style>
