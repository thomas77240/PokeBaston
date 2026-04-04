import type { GamePokemon } from '@/types/game.types';
import { TypeColoredItem } from '../ui/TypeColoredItem';
import { useGameStore } from '@/stores/useGameStore';

interface ActivePokemonStatusCardProps {
	pokemon: GamePokemon;
}

const ActivePokemonStatusCard = ({ pokemon }: ActivePokemonStatusCardProps) => {
	// const maxHP = pokemon.maxHP || 250;
	const hpPercentage = Math.max(0, Math.min(100, (pokemon.HP / pokemon.maxHP) * 100));
    const { level, phase } = useGameStore();
	// Détermination de la couleur de la barre de PV (standard Pokémon)
	const getHealthColor = () => {
		if (hpPercentage > 50) return 'bg-green-500';
		if (hpPercentage > 20) return 'bg-yellow-500';
		return 'bg-red-500 animate-pulse';
	};

	return (
		<div className={`bg-background-400 border-background-600 border-b-4 border-r-4 p-4 rounded-2xl shadow-xl w-full min-w-xs scale-95 ${phase === 'ANIMATING_RESULTS' ? 'scale-100' : ''}`}>
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-2xl font-title font-bold text-neutral-800 capitalize">{pokemon.name}</h2>
				<span className="font-main text-neutral-500 text-sm font-bold">Lvl {level || 50}</span>
			</div>

			{/* Conteneur de la barre de vie */}
			<div className="bg-neutral-200 rounded-full h-6 p-1 flex items-center shadow-inner">
				<div
					className={`h-full rounded-full transition-all duration-700 ease-in-out ${getHealthColor()}`}
					style={{ width: `${hpPercentage}%` }}
				/>
			</div>

			{/* Affichage des points de vie avec la police Varela Round */}
			<div className="flex justify-between mt-2 px-1 font-main font-medium">
				<div className="flex gap-1">
					{pokemon.type?.map((type) => (
						<TypeColoredItem
							as="div"
							key={type}
							className="text-[10px] uppercase px-2 py-0.5 bg-type rounded text-white shadow-sm justify-center items-center"
							pokemonType={type}
						>
							{type}
						</TypeColoredItem>
					))}
				</div>
				<p className="text-neutral-600 text-sm">
					<span className="font-bold text-neutral-900">{pokemon.HP}</span>
					<span className="text-neutral-400"> / {pokemon.maxHP} HP</span>
				</p>
			</div>
		</div>
	);
};

export default ActivePokemonStatusCard;
