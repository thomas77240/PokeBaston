import Button from '../components/ui/Button';
import { useGameSetupContext } from '../hooks/useGameSetupContext';
import type { GameSettings } from '../types/gameSetup.types';

const GameConfig = () => {
	const { nextStep, settings, setSettings, trainers, changeName } = useGameSetupContext();

	const updateMode = (value: GameSettings['mode']) => {
		setSettings((prev) => ({
			...prev,
			mode: value,
		}));
	};

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="font-title text-4xl">Créer une partie</h1>

			<div>

				<div>
					<label htmlFor={"trainerAName"}>Pseudo joueur 1</label>
					<input type="text" id='trainerAName' onChange={e => changeName("A", e.target.value)} value={trainers.trainerA.name} />
				</div>
				<div>
					<label htmlFor={"trainerBName"}>Pseudo joueur 2</label>
					<input type="text" id='trainerBName' onChange={e => changeName("B", e.target.value)} value={trainers.trainerB.name} />
				</div>
			</div>

			<Button onClick={nextStep}>Valider</Button>
		</div>
	);
};

export default GameConfig;
