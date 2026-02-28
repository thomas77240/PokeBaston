import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

function App() {
	return (
		<Routes>
			{/* Route par défaut (http://localhost:5173/) */}
			<Route path="/" element={<Home />} />
			<Route path="/game" element={<Game />} />
			<Route path="*" element={<h2>404 - Page introuvable 😢</h2>} />
		</Routes>
	);
}

export default App;
