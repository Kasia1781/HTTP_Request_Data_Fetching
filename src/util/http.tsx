export async function fetchAvailablePlaces(url: string) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch data!');
		}
		const data = (await response.json()) as unknown;
		return data;
	} catch (error) {
		console.error('Error fetching available places:', error);
		throw error;
	}
}
