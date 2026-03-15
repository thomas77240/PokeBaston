import type { Pokemon } from '../../types/pokemon.types';
import { PokemonUtils } from '../../utils/pokemon.utils';

interface SelectedPokemonCardProps {
    pokemon?: Pokemon;
    openPokemonModal?: () => void;
}

const SelectedPokemonCard = ({ pokemon, openPokemonModal }: SelectedPokemonCardProps) => {
    if (pokemon) {
        return (
            <div
                className='flex items-center border rounded-2xl h-full w-full min-h-0 overflow-hidden cursor-pointer hover:bg-black/5 p-4'
                onClick={openPokemonModal}
            >
                <div className="h-full aspect-square p-2 shrink-0 flex items-center justify-center">
                    <img
                        className='max-h-full max-w-full object-contain'
                        src={PokemonUtils.getImage(pokemon)}
                        alt={pokemon.name}
                    />
                </div>

                <div className="ml-2 flex flex-col h-full">
                    <h2 className='font-title text-xl'>{pokemon.name}</h2>
					<p className='text-muted'>
						{pokemon.types.join(' ')}
					</p>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-dashed rounded-2xl h-full w-full min-h-0 flex items-center justify-center">
			Ajoutez un Pokémon
        </div>
    );
};

export default SelectedPokemonCard;