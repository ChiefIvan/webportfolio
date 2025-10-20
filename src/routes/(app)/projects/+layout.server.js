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
			src: '',
			link: '/docutracker',
			category: 'programming'
		},
		{
			title: 'EventSync',
			description: 'Building innovative apps for a seamless digital experience.',
			src: '',
			link: '/eventsync',
			category: 'programming'
		},
		{
			title: 'Banner',
			src: '',
			category: 'designing'
		},
		{
			src: ''
		},
		{
			title: 'AI',
			description: 'Harnessing the power of AI to create intelligent solutions.',
			src: '',
			category: 'AI'
		}
	];
	return { samples: samples };
}
