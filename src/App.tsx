import {
	type ReactNode,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';
import './App.css';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces';
import Places from './components/Places';
import { fetchUserPlaces, updateUserPlaces } from './util/http';
import ErrorMessage from './components/ErrorMessage';
import Modal, { ModalHandle } from './components/Modal';
import DeleteConfirmation from './components/DeleteConfirmation';

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
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [confirmationKey, setConfirmationKey] = useState(0);
	const modal = useRef<ModalHandle>(null);

	const selectedPlace = useRef<UserPlace | null>(null);

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
			const updatedPlaces = [...userPlaces, userPlace].filter(
				(place, index, self) =>
					index === self.findIndex((p) => p.id === place.id)
			);
			await updateUserPlaces(updatedPlaces);
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

	function handleStartRemovePlace(place: UserPlace) {
		setModalIsOpen(true);
		selectedPlace.current = place;
		setConfirmationKey((prevKey) => prevKey + 1);
		if (modal.current) {
			modal.current?.open();
		}
	}

	function handleStopRemovePlace() {
		setModalIsOpen(false);

		if (modal.current) {
			modal.current?.close();
		}
	}

	const handleRemovePlace = useCallback(
		async function handleRemovePlace() {
			setUserPlaces((prevPickedPlaces) =>
				prevPickedPlaces.filter(
					(place) => place.id !== selectedPlace.current?.id
				)
			);

			try {
				await updateUserPlaces(
					userPlaces.filter((place) => place.id !== selectedPlace.current.id)
				);
				handleStopRemovePlace();
			} catch (error) {
				setUserPlaces(userPlaces);
				if (error instanceof Error) {
					setError(error.message);
				}
			}

			setModalIsOpen(false);
		},
		[userPlaces]
	);

	return (
		<>
			<Modal open={modalIsOpen} ref={modal} onClose={handleStopRemovePlace}>
				<DeleteConfirmation
					onCancel={handleStopRemovePlace}
					onConfirm={handleRemovePlace}
					key={confirmationKey}
				/>
			</Modal>
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
						onSelectedPlace={handleStartRemovePlace}
					/>
				)}

				<AvailablePlaces onSelectedPlaces={handleSelectedPlaces} />
			</main>
		</>
	);
}

export default App;
