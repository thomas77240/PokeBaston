import type { GamePokemon } from '@/types/game.types';
import Button from '../ui/Button';
import { useGameStore } from '@/stores/useGameStore';

interface AttacksViewProps {
	goBack: () => void;
	activePokemon: GamePokemon | null;
	trainerKey: 'A' | 'B';
}

const AttacksView = ({ goBack, activePokemon, trainerKey }: AttacksViewProps) => {
	const { registerChoice, getTrainer } = useGameStore();
	const trainer = getTrainer(trainerKey);

	const selectAttack = (moveId: number) => {
		registerChoice(trainerKey, { type: 'ATTACK', moveId });
		setTimeout(() => {
			goBack();
		}, 200);
	}

	return (
		<div className="h-full w-full p-8">
			<div className="flex items-center gap-4 mb-12">
				<Button onClick={goBack}>Retour</Button>
				<h2 className="text-2xl font-bold font-title">Attaques {trainer?.name}</h2>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{activePokemon?.moves.map((move, index) => (
					<button
						onClick={() => selectAttack(index)}
						key={move.name}
						className="border p-2"
					>
						<h3 className="font-bold">{move.name}</h3>
						<p>Type: {move.type}</p>
					</button>
				))}
			</div>
		</div>
	);
};

export default AttacksView;
