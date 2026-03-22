import { useNavigate } from 'react-router-dom';
import ConfigHeader from '../components/TeamConfig/ConfigHeader';
import Button from '../components/ui/Button';
import { useGameSetupContext } from '../hooks/useGameSetupContext';
import type { GameSettings } from '../types/gameSetup.types';
import { Info } from 'lucide-react';

const GameConfig = () => {
	const { nextStep, settings, setSettings, trainers, changeName } = useGameSetupContext();
	const navigate = useNavigate();
	const updateLevel = (value: GameSettings['level']) => {
		setSettings((prev) => ({
			...prev,
			level: value,
		}));
	};

	return (
		<div className="flex flex-col h-full">
			<ConfigHeader
				backButtonAction={() => {
					navigate('/');
				}}
				title="Créer une partie"
			/>
			<div className="max-w-3xl w-full m-auto flex flex-col gap-12">
				<div className="w-full grid grid-cols-2 divide-x divide-background-600">
					{/* Trainers name */}
					<div className="space-y-4 pr-8">
						<div className="flex flex-col gap-1">
							<label className="text-lg text-background-900 uppercase" htmlFor={'trainerAName'}>
								Pseudo joueur A
							</label>
							<input
								placeholder="Pseudo joueur A"
								type="text"
								id="trainerAName"
								className="bg-background-50 focus:bg-background-400 text-lg px-4 py-2 rounded-xl border-background-600 border shadow-sm"
								onChange={(e) => changeName('A', e.target.value)}
								value={trainers.trainerA.name}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-lg text-background-900 uppercase" htmlFor={'trainerBName'}>
								Pseudo joueur B
							</label>
							<input
								placeholder="Pseudo joueur B"
								type="text"
								id="trainerBName"
								className="bg-background-50 focus:bg-background-400 text-lg px-4 py-2 rounded-xl border-background-600 border shadow-sm"
								onChange={(e) => changeName('B', e.target.value)}
								value={trainers.trainerB.name}
							/>
						</div>
					</div>

					{/* Game Level */}
					<div className="group flex flex-col gap-4 pl-8">
						<label className="text-lg text-background-900 uppercase" htmlFor={'game-level'}>
							Niveau des Pokémons
						</label>
						<div className="flex gap-2 text-sm text-muted bg-background-50 p-4 rounded-lg border border-background-600/50 ">
							<Info strokeWidth={1} className="shrink-0" />
							<p>Le niveau selectionné sera appliqué à tout les Pokemons de la partie</p>
						</div>
						<div className="flex gap-4">
							<input
								onChange={(e) => updateLevel(parseInt(e.target.value))}
								value={settings.level}
								type="range"
								min={1}
								max={100}
								step={1}
								name="game-level"
								id="game-level"
								className="w-full accent-neutral-500 active:accent-neutral-950"
							/>
							<input
								className=" bg-background-50 focus:bg-background-200 text-lg px-4 py-2 rounded-xl border-background-600 border shadow-sm"
								type="number"
								min={1}
								max={100}
								step={1}
								value={settings.level}
								onChange={(e) => updateLevel(parseInt(e.target.value))}
							/>
						</div>
					</div>
				</div>
				<Button
					className="text-xl font-medium tracking-wide py-4 max-w-sm mx-auto w-full transition-all duration-300 not-disabled:shadow-lg not-disabled:hover:shadow-xl translate-x-0 not-disabled:hover:-translate-y-1"
					onClick={nextStep}
					disabled={!trainers.trainerA.name || !trainers.trainerB.name}
				>
					Valider
				</Button>
			</div>
		</div>
	);
};

export default GameConfig;
