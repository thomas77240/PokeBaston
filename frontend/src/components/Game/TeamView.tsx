import type { GamePokemon } from '@/types/game.types';
import Button from '../ui/Button';
import { useGameStore } from '@/stores/useGameStore';

interface TeamViewProps {
	goBack: () => void;
	trainerKey: 'A' | 'B';
	activePokemon: GamePokemon | null;
}

const TeamView = ({ goBack, trainerKey, activePokemon }: TeamViewProps) => {
	const { registerChoice, getTrainer } = useGameStore();
	const trainer = getTrainer(trainerKey);

	const selectPokemon = (pokemonId: number) => {
		registerChoice(trainerKey, { type: 'SWITCH', pokemonId });
		setTimeout(() => {
			goBack();
		}, 200);
	};

	return (
		<div className="h-full w-full p-8">
			<div className="flex items-center gap-4 mb-12">
				<Button onClick={goBack}>Retour</Button>
				<h2 className="text-2xl font-bold font-title">Équipe</h2>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{trainer?.team?.map((pokemon, index) => {
					return pokemon.id === activePokemon?.id ? (
						<div key={pokemon.name} className="border p-2 bg-yellow-200">
							<h3 className="font-bold">{pokemon.name} (Actif)</h3> // Pokémon actif
							<p>Type: {pokemon.type.join(', ')}</p>
						</div>
					) : (
						 // Autres pokémons
						<button onClick={() => selectPokemon(index)} key={pokemon.name} className="border p-2">
							<h3 className="font-bold">{pokemon.name}</h3>
							<p>Type: {pokemon.type.join(', ')}</p>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default TeamView;
