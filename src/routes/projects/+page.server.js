export const load = async () => {
	try {
		const { samples } = await fetchDataFromDatabase(); // Your database call
		return { samples }; // In SvelteKit, `data` is directly returned (not `props` in modern versions)
	} catch (error) {
		return { status: 500, error: new Error('Failed to load data') };
	}
};

async function fetchDataFromDatabase() {
	// await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
	const samples = [
		{
			title: 'DocuTracker',
			description: 'Crafting unique designs tailored to your needs.',
			src: '/assets/mobile_development.jpg'
		},
		{
			title: 'EventSync',
			description: 'Building innovative apps for a seamless digital experience.',
			src: '/assets/web_development.jpg'
		},
		{
			src: '/assets/more.jpg'
		},
		{
			src: '/assets/more.jpg'
		},
		{
			title: 'AI',
			description: 'Harnessing the power of AI to create intelligent solutions.',
			src: '/assets/more.jpg'
		}
	];
	return { samples: samples };
}
