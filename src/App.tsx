import { useState } from 'react';
import './App.css';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces';
import Places from './components/Places';

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

	const [userPlaces, setUserPlaces] = useState<usePlacesProps>([]);
	console.log(userPlaces);

	function handleSelectedPlaces(userPlace: UserPlace) {
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
	}

	return (
		<>
			<header>
				<img src={logoImg} alt='logo' />
				<h1>PlacePicker</h1>
				<p>
					Create your personal collection of places you would like to visit or
					you have visited
				</p>
			</header>
			<main>
				<Places
					places={userPlaces}
					title='I would like to visit ...'
					fallbackText='Select the places you would like to visit below.'
				/>
				<AvailablePlaces onSelectedPlaces={handleSelectedPlaces} />
			</main>
		</>
	);
}

export default App;
