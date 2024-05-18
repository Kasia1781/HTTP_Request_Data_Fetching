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

export async function updateUserPlaces(places: string[], url: string) {
	try {
		const response = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify({ places }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const resData = await response.json();

		if (!response.ok) {
			throw new Error(resData.message || 'Błąd wysyłania danych');
		}

		return resData.message;
	} catch (error) {
		console.error('Błąd:', error);
		throw new Error('Błąd sieciowy lub serwerowy');
	}
}
