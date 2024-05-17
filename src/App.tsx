import './App.css';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces';
import Places from './components/Places';

function App() {
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
					places={[]}
					title='I would like to visit ...'
					fallbackText='Select the places you would like to visit below.'
				/>
				<AvailablePlaces />
			</main>
		</>
	);
}

export default App;
