import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TeamConfig from './pages/TeamConfig';
import BaseLayout from './layouts/BaseLayout';
import CreateGameLayout from './layouts/GameSetupLayout';
import GameConfig from './pages/GameSettings';
import GameSetupSummary from './pages/GameSetupSummary';
import Game from './pages/Game';

function App() {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h2>404 - Page introuvable</h2>} />
			</Route>
			<Route path="/setup" element={<CreateGameLayout />}>
				<Route index element={<GameConfig />} />
				<Route path="trainer-1" element={<TeamConfig trainer={"A"} />} />
				<Route path="trainer-2" element={<TeamConfig trainer={"B"} />} />
				<Route path="summary" element={<GameSetupSummary />} />
			</Route>
				<Route path='/game/:gameId' element={<Game />} />
		</Routes>
	);
}

export default App;
