import type { GamePokemon } from '@/types/game.types';

interface ActivePokemonStatusCardProps {
	pokemon: GamePokemon;
}
const ActivePokemonStatusCard = ({ pokemon }: ActivePokemonStatusCardProps) => {
	return (
		<div className='bg-background-400 p-4 rounded-lg w-full text-center'>
			<h2 className="text-xl font-bold">{pokemon.name}</h2>
			<p className="text-sm">PV: {pokemon.HP} / {pokemon.maxHP || 1000}</p>
            <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${(pokemon.HP / (pokemon.maxHP || 1000)) * 100}%` }}
                />

            </div>
		</div>
	);
};

export default ActivePokemonStatusCard;
