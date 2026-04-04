import type { GamePokemon } from '@/types/game.types';
import { useGameStore } from '@/stores/useGameStore';
import ConfigHeader from '../TeamConfig/ConfigHeader';
import { TypeColoredItem } from '../ui/TypeColoredItem';
import { PokemonUtils } from '@/utils/pokemon.utils';

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
        <div className="h-full w-full flex flex-col">
            <ConfigHeader title={`Équipe`} backButtonAction={goBack} className="px-6!" />

            <div className="p-6 flex-1 overflow-y-auto">
                <h2 className="text-2xl font-title font-bold text-neutral-800 text-center mb-8">
                    Qui envoyer au combat ?
                </h2>

                {/* Container empilé (Liste verticale) */}
                <div className="flex flex-col gap-3">
                    {trainer?.team?.map((pokemon, index) => {
                        const isActive = pokemon.id === activePokemon?.id;
                        const isFainted = pokemon.HP <= 0;
                        const isDisabled = isActive || isFainted;

                        // Calcul pour la barre de vie
                        const hpPercentage = Math.max(0, Math.min(100, (pokemon.HP / pokemon.maxHP) * 100));
                        const hpColorClass = hpPercentage > 50
                            ? 'bg-green-500'
                            : hpPercentage > 20
                                ? 'bg-yellow-500'
                                : 'bg-red-500';

                        return (
                            <button
                                key={`${pokemon.id}-${index}`}
                                onClick={() => !isDisabled && selectPokemon(index)}
                                disabled={isDisabled}
                                className={`w-full bg-background-100 border-background-600 border-2 transition-all shadow-sm rounded-2xl p-3 flex items-center gap-4 ${
                                    isDisabled
                                        ? 'opacity-60 cursor-not-allowed grayscale-40'
                                        : 'cursor-pointer active:scale-95'
                                }`}
                            >
                                {/* Image du Pokémon (Gauche) */}
                                <div className="h-16 w-16 shrink-0 relative flex items-center justify-center bg-background-50 rounded-xl border border-background-200">
                                    <img
                                        className="relative z-20 object-contain w-full h-full p-1 drop-shadow-md hover:scale-110 transition-transform duration-300"
                                        src={PokemonUtils.getImage(pokemon)}
                                        alt={pokemon.name}
                                    />
                                </div>

                                {/* Infos: Nom et Types (Centre) */}
                                <div className="flex flex-col items-start grow">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-title font-bold text-lg text-neutral-800 leading-none">
                                            {pokemon.name}
                                        </h3>
                                        {isActive && (
                                            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest bg-blue-100 px-1.5 py-0.5 rounded-sm">
                                                Actif
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {pokemon.type.map((t) => (
                                            <TypeColoredItem
                                                key={t}
                                                as="div"
                                                className="text-[9px] font-main uppercase px-1.5 py-0.5 bg-type rounded text-white shadow-sm flex justify-center items-center"
                                                pokemonType={t}
                                            >
                                                {t}
                                            </TypeColoredItem>
                                        ))}
                                    </div>
                                </div>

                                {/* Barre de vie (Droite) */}
                                <div className="w-28 shrink-0 flex flex-col gap-1">
                                    <div className="flex justify-between items-end px-0.5 mb-0.5">
                                        <span className="text-[9px] font-bold text-neutral-500 uppercase">PV</span>
                                        <span className={`text-[11px] font-bold leading-none ${isFainted ? 'text-red-500' : 'text-neutral-700'}`}>
                                            {pokemon.HP}/{pokemon.maxHP}
                                        </span>
                                    </div>
                                    <div className="w-full bg-background-300 rounded-full h-2 border border-background-400 overflow-hidden">
                                        <div
                                            className={`h-full ${hpColorClass} transition-all duration-500 ease-out`}
                                            style={{ width: `${hpPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TeamView;