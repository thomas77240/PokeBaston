import { Award, X } from 'lucide-react';
import type { Pokemon } from '../../types/pokemon.types';
import { PokemonUtils } from '../../utils/pokemon.utils';
import TypeColoredItem from '../ui/TypeColoredItem';

interface SelectedPokemonCardProps {
	pokemon?: Pokemon;
	openPokemonModal?: () => void;
	removePokemon?: () => void;
	isCaptain?: boolean;
}

const SelectedPokemonCard = ({
	pokemon,
	openPokemonModal,
	removePokemon,
	isCaptain = false,
}: SelectedPokemonCardProps) => {
	if (pokemon) {
		return (
			<div
				className="flex items-center bg-background-50 border border-background-600 shadow rounded-2xl h-full w-full min-h-0 overflow-hidden cursor-pointer p-4"
				onClick={openPokemonModal}
			>
				<div className="h-full aspect-square p-1 rounded-lg shrink-0 flex items-center justify-center">
					<img
						className="max-h-full max-w-full object-contain"
						src={PokemonUtils.getImage(pokemon)}
						alt={pokemon.name}
					/>
				</div>

				<div className="ml-2 flex flex-col h-full">
					<h2 className="font-title text-xl flex items-center gap-2">
						{pokemon.name}
						{isCaptain && <Award className="text-amber-300 bg-amber-100 p-1 rounded-full" size={24} />}
					</h2>
					<div className="space-x-1">
						{pokemon.types.map((type) => {
							return (
								<TypeColoredItem
									as='span'
									pokemonType={type}
									key={`filter-${type}`}
									className={`px-2 py-0.5 rounded-full text-sm font-medium transition-all duration-200 border select-none
										bg-type/20 text-type`}
								>
									{type}
								</TypeColoredItem>
							);
						})}
					</div>
				</div>

				<button
					onClick={(e) => {
						e.stopPropagation();
						removePokemon?.();
					}}
					className="ml-auto p-2 hover:bg-background-400 rounded-full cursor-pointer text-background-700 hover:text-neutral-950"
				>
					<X size={20} />
				</button>
			</div>
		);
	}

	return (
		<div className="border border-background-700 text-background-800 text-center border-dashed text-lg font-medium rounded-2xl h-full w-full min-h-0 flex items-center justify-center">
			Ajoutez un Pokémon
		</div>
	);
};

export default SelectedPokemonCard;
