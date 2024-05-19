import { ReactNode, useEffect, useRef, useState } from 'react';
import './App.css';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces';
import Places from './components/Places';
import { fetchUserPlaces, updateUserPlaces } from './util/http';
import ErrorMessage from './components/ErrorMessage';
import Modal, { ModalHandle } from './components/Modal';

function App() {
	type UserPlace = {
		id: number;
		title: string;
		image: {
			src: string;
			alt: string;
		};
	};

	type usePlacesProps = {
		id: number;
		title: string;
		image: {
			src: string;
			alt: string;
		};
	};

	const [userPlaces, setUserPlaces] = useState<usePlacesProps[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const modal = useRef<ModalHandle>(null);

	useEffect(() => {
		async function fetchPlaces() {
			setIsFetching(true);
			try {
				const places = await fetchUserPlaces();
				setUserPlaces(places);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
			setIsFetching(false);
		}
		fetchPlaces();
	}, []);

	async function handleSelectedPlaces(userPlace: UserPlace) {
		setUserPlaces((prevState) => {
			const newUserPlaces: usePlacesProps = {
				id: userPlace.id,
				title: userPlace.title,
				image: userPlace.image,
			};

			if (prevState.some((place) => place.id === userPlace.id)) {
				return prevState;
			}
			return [...prevState, newUserPlaces];
		});

		try {
			await updateUserPlaces([userPlace, ...userPlaces]);
		} catch (error) {
			setUserPlaces(userPlaces);
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	}

	function handleError() {
		setError(null);
	}

	if (error) {
		modal.current?.open();
	}

	function closeModal() {
		modal.current?.close();
	}

	let content: ReactNode;

	if (error) {
		content = (
			<Modal ref={modal} onClose={closeModal}>
				<ErrorMessage
					title='Wystąpił błąd zapisywania zdjęć!'
					message={error}
					onClose={handleError}
				/>
			</Modal>
		);
	}

	return (
		<>
			{content}
			<header>
				<img src={logoImg} alt='logo' />
				<h1>PlacePicker</h1>
				<p>
					Create your personal collection of places you would like to visit or
					you have visited
				</p>
			</header>
			<main>
				{error && (
					<Modal ref={modal} onClose={closeModal}>
						<ErrorMessage
							title='Nie udało się pobrać zdjęć zapisanych prz użytkownika!'
							message={error}
							onClose={handleError}
						/>
					</Modal>
				)}
				{!error && (
					<Places
						places={userPlaces}
						title='I would like to visit ...'
						fallbackText='Select the places you would like to visit below.'
						isLoading={isFetching}
					/>
				)}

				<AvailablePlaces onSelectedPlaces={handleSelectedPlaces} />
			</main>
		</>
	);
}

export default App;
