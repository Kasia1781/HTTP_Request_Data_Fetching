import './App.css';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces';

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
				<AvailablePlaces />
			</main>
		</>
	);
}

export default App;
