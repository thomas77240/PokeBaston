// Scene.tsx
import stage from '@/assets/images/stages/stage_1.png';
import { useGameStore } from '@/stores/useGameStore';
import { PokemonUtils } from '@/utils/pokemon.utils';
import ActivePokemonStatusCard from './ActivePokemonStatusCard';

const Stage = () => {
	// On récupère aussi la phase et les logs depuis le store
	const { trainerA, trainerB, phase } = useGameStore();

	// Remplacer par state.combatLogs quand tu l'auras ajouté à Zustand
	const currentLog = "Reptincel utilise Lance-Flammes ! C'est super efficace !";

	const activePokemonA = trainerA?.team[trainerA.activePokemon];
	const activePokemonB = trainerB?.team[trainerB.activePokemon];

	return (
		<div className="w-full h-full bg-white flex flex-col items-center">
			{/* 1. LA SCÈNE (En haut, garde ses proportions) */}
			<div className="w-full relative aspect-video shrink-0">
				<div className="absolute inset-0 h-full w-full">
					<img src={stage} alt="Stage" className="w-full h-full object-cover" />
				</div>

				{/* Les Pokémon */}
				<div className="absolute inset-0 h-full flex flex-col justify-end items-center pb-12">
    {activePokemonA && (
        <>
            <div className="absolute bottom-[18%] left-[10%] h-48 w-64 flex items-end justify-center">
                <img
                    src={PokemonUtils.getBackSprite(activePokemonA)}
                    alt={activePokemonA?.name}
                    // scale-[2] double la taille d'origine (ou scale-[2.5], scale-[3] selon tes besoins)
                    // origin-bottom s'assure qu'en grandissant, les pieds restent au sol
                    // [image-rendering:pixelated] garde les pixels nets et empêche le flou
                    className="h-auto w-auto object-contain scale-[3.5] origin-bottom [image-rendering:pixelated]"
                />
            </div>

            <div className="absolute right-[3%] bottom-[5%]">
                <ActivePokemonStatusCard pokemon={activePokemonA} />
            </div>
        </>
    )}

    {activePokemonB && (
        <>
            <div className="absolute top-[40%] right-[22%] h-40 w-56 flex items-end justify-center">
                <img
                    src={PokemonUtils.getSprite(activePokemonB)}
                    alt={activePokemonB?.name}
                    // Souvent le Pokémon adverse est un poil plus petit pour l'effet de perspective (ex: 1.5 au lieu de 2)
                    className="h-auto w-auto object-contain scale-[2] origin-bottom [image-rendering:pixelated]"
                />
            </div>

            <div className="absolute left-[3%] top-[5%]">
                <ActivePokemonStatusCard pokemon={activePokemonB} />
            </div>
        </>
    )}
</div>
			</div>

			{/* 2. LA ZONE DE LOGS (En bas, prend le reste de la place) */}
			<div className="grow w-full p-8 flex flex-col justify-center">
				<div
					className={`
                    w-full h-full max-h-48 border-4 border-gray-700 bg-white rounded-lg p-6 shadow-lg
                    transition-all duration-500 transform
                    ${phase === 'ANIMATING_RESULTS' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
                `}
				>
					<p className="text-2xl font-title text-gray-800 leading-relaxed">{currentLog}</p>

					{/* Petit indicateur clignotant classique en bas à droite */}
					{phase === 'ANIMATING_RESULTS' && (
						<div className="absolute bottom-4 right-6 w-4 h-4 bg-red-500 rounded-full animate-bounce" />
					)}
				</div>
			</div>
		</div>
	);
};

export default Stage;
