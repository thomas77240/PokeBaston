// Scene.tsx
import stage from '@/assets/images/stages/stage_1.png';
import { useGameStore } from '@/stores/useGameStore';
import { PokemonUtils } from '@/utils/pokemon.utils';
import ActivePokemonStatusCard from './ActivePokemonStatusCard';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import TypewriterText from '../ui/TypewriterText';

const Stage = () => {
    const { trainerA, trainerB, phase, currentLog, attacking, takingDamage } = useGameStore();

    const activePokemonA = trainerA?.activePokemon !== undefined && trainerA?.activePokemon !== null
        ? trainerA.team[trainerA.activePokemon]
        : null;

    const activePokemonB = trainerB?.activePokemon !== undefined && trainerB?.activePokemon !== null
        ? trainerB.team[trainerB.activePokemon]
        : null;

    // Définition des animations physiques
    const spriteVariants: Record<'A' | 'B', Variants> = {
        A: {
            initial: { scale: 0, opacity: 0, x: -50, y: 0 },
            idle: { scale: 1, opacity: 1, x: 0, y: 0, filter: 'brightness(1) sepia(0) hue-rotate(0deg) saturate(1)', transition: { type: 'spring', bounce: 0.4, duration: 0.6 } },
            attack: { x: [0, 60, 0], y: [0, -40, 0], transition: { duration: 0.4, ease: "easeInOut" } },
            hurt: {
                opacity: [1, 0.3, 1, 0.3, 1],
                x: [0, -10, 10, -10, 10, 0],
                filter: [
                    'brightness(1) sepia(0) hue-rotate(0deg) saturate(1)',
                    'brightness(0.5) sepia(1) hue-rotate(315deg) saturate(5)',
                    'brightness(1) sepia(0) hue-rotate(0deg) saturate(1)'
                ],
                transition: { duration: 0.5 }
            },
            exit: { scale: 0, opacity: 0, x: -50, transition: { duration: 0.3 } },
        },
        B: {
            initial: { scale: 0, opacity: 0, x: 50, y: 0 },
            idle: { scale: 1, opacity: 1, x: 0, y: 0, filter: 'brightness(1) sepia(0) hue-rotate(0deg) saturate(1)', transition: { type: 'spring', bounce: 0.4, duration: 0.6 } },
            attack: { x: [0, -60, 0], y: [0, 40, 0], transition: { duration: 0.4, ease: "easeInOut" } },
            hurt: {
                opacity: [1, 0.3, 1, 0.3, 1],
                x: [0, 10, -10, 10, -10, 0],
                filter: [
                    'brightness(1) sepia(0) hue-rotate(0deg) saturate(1)',
                    'brightness(0.5) sepia(1) hue-rotate(315deg) saturate(5)',
                    'brightness(1) sepia(0) hue-rotate(0deg) saturate(1)'
                ],
                transition: { duration: 0.5 }
            },
            exit: { scale: 0, opacity: 0, x: 50, transition: { duration: 0.3 } },
        },
    };

    // Helper pour générer le tableau des états d'animation en cours
    const getAnimationState = (player: 'A' | 'B') => {
        const states = ['idle'];
        if (attacking === player) states.push('attack');
        if (takingDamage === player) states.push('hurt');
        return states;
    };

    return (
        <div className="w-full h-full bg-neutral-900 flex flex-col items-center">
            <div className="w-full flex-1 flex flex-col justify-start items-center overflow-hidden bg-black relative">
                <div className="relative w-full aspect-video max-w-[calc((100vh-120px)*16/9)] shadow-2xl">

                    {/* Image de fond */}
                    <div className="absolute inset-0 h-full w-full">
                        <img src={stage} alt="Stage" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute inset-0 h-full w-full z-10">
                        {/* --- POKEMON JOUEUR A --- */}
                        <div className="absolute bottom-[10%] left-[15%] flex items-end justify-center">
                            <AnimatePresence mode="wait">
                                {activePokemonA && (
                                    <motion.img
                                        key={`A-${activePokemonA.id}`}
                                        variants={spriteVariants.A}
                                        initial="initial"
                                        animate={getAnimationState('A')}
                                        exit="exit"
                                        src={PokemonUtils.getBackSprite(activePokemonA)}
                                        alt={activePokemonA.name}
                                        className="object-contain scale-[2.5] origin-bottom [image-rendering:pixelated]"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Status Card Joueur A */}
                        {activePokemonA && (
                            <div className="absolute right-2 bottom-2 md:right-6 md:bottom-6 w-full max-w-[30%]">
                                <ActivePokemonStatusCard pokemon={activePokemonA} />
                            </div>
                        )}

                        {/* --- POKEMON JOUEUR B --- */}
                        <div className="absolute bottom-[40%] left-[70%] flex items-end justify-center">
                            <AnimatePresence mode="wait">
                                {activePokemonB && (
                                    <motion.img
                                        key={`B-${activePokemonB.id}`}
                                        variants={spriteVariants.B}
                                        initial="initial"
                                        animate={getAnimationState('B')}
                                        exit="exit"
                                        src={PokemonUtils.getSprite(activePokemonB)}
                                        alt={activePokemonB.name}
                                        className="object-contain scale-[1.5] origin-bottom [image-rendering:pixelated]"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Status Card Joueur B */}
                        {activePokemonB && (
                            <div className="absolute left-2 top-2 md:left-6 md:top-6 w-full max-w-[30%]">
                                <ActivePokemonStatusCard pokemon={activePokemonB} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ZONE DE LOGS */}
            <div className="w-full shrink-0 min-h-30 px-4 py-4 flex flex-col justify-center items-center bg-black text-white">
                <div
                    className={`
                    w-full h-full max-w-5xl rounded-lg px-6 py-4 shadow-lg relative
                    flex items-center transition-all duration-500 transform
                    ${phase === 'ANIMATING_RESULTS' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
                `}
                >
                    <p className="text-lg md:text-xl lg:text-2xl font-title text-white leading-relaxed">
                        <TypewriterText text={currentLog || ''} speed={30} />
                    </p>

                    {phase === 'ANIMATING_RESULTS' && (
                        <div className="absolute bottom-4 right-6 w-3 h-3 bg-white rounded-full animate-bounce" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stage;