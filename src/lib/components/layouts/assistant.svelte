<script>
	import { fade } from 'svelte/transition';
	import { autosize } from '$lib/autosize';

	import Button from '$lib/components/shared/button.svelte';
	import Message from '$lib/components/icons/sparkle.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import Spinner from '$lib/components/icons/spinner.svelte';

	let textareRef = $state();
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

	const handleSubmit = async (event) => {
		event.preventDefault();

		const question = userQuestion;

		userQuestion = '';
		textareRef.style.height = 'auto';
		messages = [...messages, { sender: 'You', message: question }];
		isLoading = true;

		try {
			const response = await fetch(
				'https://api.arliai.com/v1/chat/completions',
				// 'https://api.x.ai/v1/chat/completions',
				{
					method: 'POST',
					headers: {
						Authorization: '',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						model: 'Llama-3.3-70B-Rombos-LLM',
						// model: 'grok-3-latest',
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
				}
			);

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();
			messages = [...messages, { sender: 'Assistant', message: data.choices[0].message.content }];
		} catch (error) {
			console.error('Error:', error);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="assistant-wrapper">
	{#if isOpen}
		<div transition:fade={{ duration: 300 }} class="message-wrapper">
			{#if messages.length}
				<div class="messages">
					<ul>
						{#each messages as message}
							{@const isUser = message.sender === 'You'}
							<li class:user={isUser}>
								<div class:user={isUser} class="content-wrapper">
									<h5>{message.sender}</h5>
									<p>{message.message}</p>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				<div class="messages greet-wrapper">Hi, let's talk.</div>
			{/if}
			<form onsubmit={handleSubmit}>
				<div class="textarea-wrapper">
					<textarea
						id="textarea"
						placeholder=""
						bind:this={textareRef}
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

<style>
	div.assistant-wrapper {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		display: flex;
		align-items: end;
		justify-content: end;
		gap: 1rem;
		flex-wrap: wrap;
		z-index: 2;

		div.message-wrapper {
			padding: 0.5rem;
			height: 35rem;
			width: 30rem;
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
</style>
