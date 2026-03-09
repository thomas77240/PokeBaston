import Button from '../components/ui/Button';
import RadioGroup from '../components/ui/RadioGroup';
import { useGameSetupContext } from '../hooks/useGameSetupContext';
import { GAME_MODES, type GameSettings } from '../types/gameSetup.types';

const GameConfig = () => {
	const { nextStep, settings, setSettings } = useGameSetupContext();

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
				<p>Selectionnez le mode de jeu</p>
				<RadioGroup
					onChange={(value) => updateMode(value)}
					selectedValue={settings.mode}
					name="Modes de jeu"
					options={GAME_MODES.map((option) => ({ label: option, value: option }))}
				/>
			</div>

			<Button onClick={nextStep}>Valider</Button>
		</div>
	);
};

export default GameConfig;
