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

export async function updateUserPlaces(places: string[]) {
	try {
		const response = await fetch('http://localhost:3000/user-places', {
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
		throw new Error('Błąd sieciowy lub serwerowy!');
	}
}

//pobieramy zapisane w pliku user-places.json dane
export async function fetchUserPlaces() {
	try {
		const response = await fetch('http://localhost:3000/user-places');
		if (!response.ok) {
			throw new Error(
				'Nie udało się pobrać zdjęć zapisanych przez użytkownika!'
			);
		}
		const resData = (await response.json()) as unknown;
		console.log(resData);

		return resData.places;
	} catch (error) {
		console.error('Błąd:', error);
		throw new Error('Błąd sieciowy lub serwerowy!');
	}
}
