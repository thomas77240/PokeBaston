import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TeamConfig from './pages/TeamConfig';
import BaseLayout from './layouts/BaseLayout';
import CreateGameLayout from './layouts/GameSetupLayout';
import GameConfig from './pages/GameSettings';

function App() {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h2>404 - Page introuvable</h2>} />
			</Route>
			<Route path="/setup" element={<CreateGameLayout />}>
				<Route index element={<GameConfig />} />
				<Route path="player-1" element={<TeamConfig player={1} />} />
				<Route path="player-2" element={<TeamConfig player={2} />} />
			</Route>
		</Routes>
	);
}

export default App;
