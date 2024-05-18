import { ReactNode, useEffect, useRef, useState } from 'react';
import Places, { PlaceProps } from './Places';
import { fetchAvailablePlaces } from '../util/http';
import ErrorMessage from './ErrorMessage';
import Modal, { ModalHandle } from './Modal';

type AvailablePlacesProps = {
	id: number;
	image: {
		src: string;
		alt: string;
	};
	title: string;
	onSelectedPlaces: () => void;
};

export default function AvailablePlaces({ onSelectedPlaces }) {
	const [availablePlaces, setAvailablePlaces] = useState<PlaceProps[]>();
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState<string>();

	const modal = useRef<ModalHandle>(null);

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
		modal.current?.open();
	}

	function closeModal() {
		modal.current?.close();
	}

	if (error) {
		content = (
			<Modal ref={modal} onClose={closeModal}>
				<ErrorMessage
					title='Wystąpił błąd!'
					message={error}
					onClose={closeModal}
				/>
			</Modal>
		);
	}

	if (availablePlaces) {
		content = (
			<Places
				title='AvailablePlaces'
				places={availablePlaces}
				fallbackText='No places available'
				onSelectedPlace={onSelectedPlaces}
			/>
		);
	}

	return <>{content}</>;
}
