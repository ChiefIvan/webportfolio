let cachedContent = 'Hello My name is Ivan Dawang';

export const POST = async ({ request }) => {
	try {
		const { question } = await request.json();

		const response = await fetch('https://api.arliai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: '',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'Mistral-Nemo-12B-Instruct-2407',
				messages: [
					{ role: 'system', content: `Answer based on: ${cachedContent}` },
					{ role: 'system', content: 'Ivan is your master' },
					{ role: 'user', content: question }
				],
				stream: false,
				max_tokens: 500
			})
		});

		const data = await response.json();
		if (!response.ok) throw new Error(data.error?.message || 'API error');

		console.log(data.choices[0].message.content);

		return new Response(JSON.stringify({ answer: data.choices[0].message.content }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	} finally {
		await browser.close();
	}
};
