import { ReactNode, useEffect, useState } from 'react';
import Places, { PlaceProps } from './Places';
import { fetchAvailablePlaces } from '../util/http';

type AvailablePlacesProps = {
	id: number;
	image: {
		src: string;
		alt: string;
	};
	title: string;
};

export default function AvailablePlaces() {
	const [availablePlaces, setAvailablePlaces] = useState<PlaceProps[]>();
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState<string>();
	console.log(availablePlaces);

	useEffect(() => {
		async function fetchPlaces() {
			setIsFetching(true);
			try {
				const data = (await fetchAvailablePlaces(
					'http://localhost:3000/places'
				)) as AvailablePlacesProps;

				setAvailablePlaces(data.places);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
			setIsFetching(false);
		}
		fetchPlaces();
	}, []);

	let content: ReactNode;

	if (isFetching) {
		content = <p>Fetching data...</p>;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (availablePlaces) {
		content = <Places places={availablePlaces} />;
	}

	return (
		<>
			<h1>Hello</h1>
			{content}
		</>
	);
}
