// Game.tsx
import GameResultOverlay from '@/components/Game/GameResultOverlay';
import Scene from '@/components/Game/Stage';
import TrainerMenu from '@/components/Game/TrainerMenu';
import { useGameStore } from '@/stores/useGameStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Game = () => {
	const { gameId } = useParams();

	const initGame = useGameStore((state) => state.initGame);
	const trainerA = useGameStore((state) => state.trainerA);
	const trainerB = useGameStore((state) => state.trainerB);
	const currentPlayer = useGameStore((state) => state.currentTurnUI);

	// On récupère la phase actuelle pour savoir si on anime
	const phase = useGameStore((state) => state.phase);
	const isLoading = useGameStore((state) => state.isLoading);

	useEffect(() => {
		if (gameId) {
			initGame(gameId);
		}
	}, [gameId, initGame]);


	// Calcul de la position de la caméra
	let cameraX = '0vw';
	if (phase === 'ANIMATING_RESULTS') {
		cameraX = '-15vw'; // Centre parfaitement la zone de 70vw
	} else {
		cameraX = currentPlayer === 'A' ? '0vw' : '-30vw';
	}

	return (
		<div className="overflow-hidden relative w-screen h-screen bg-black">


			{phase === 'FINISHED' && <GameResultOverlay />}

			<AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md z-100 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="bg-white border-4 border-neutral-200 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center gap-6"
                        >
                            {/* Icône qui tourne */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-100 rounded-full blur-lg animate-pulse" />
                                <Loader2 className="w-16 h-16 text-red-500 animate-spin relative z-10" />
                            </div>

                            {/* Textes */}
                            <div className="flex flex-col items-center gap-2">
                                <h2 className="text-2xl font-title font-bold text-neutral-800 uppercase tracking-widest text-center">
                                    Préparation du terrain...
                                </h2>
                                <p className="text-neutral-500 font-main font-semibold tracking-wider animate-pulse">
                                    Veuillez patienter
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

			{/* Un overlay sombre qui s'affiche sur les menus pendant l'animation pour focus l'attention */}
			<motion.div
				className="absolute inset-0 bg-black z-10 pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: phase === 'ANIMATING_RESULTS' ? 0.2 : 0 }}
				transition={{ duration: 0.5 }}
			/>

			{/* RIDEAU GAUCHE */}
			<motion.div
				className="absolute left-0 top-0 h-full bg-black z-30"
				initial={{ width: '0vw' }}
				animate={{ width: phase === 'ANIMATING_RESULTS' ? '15vw' : '0vw' }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			/>

			{/* RIDEAU DROIT */}
			<motion.div
				className="absolute right-0 top-0 h-full bg-black z-30"
				initial={{ width: '0vw' }}
				animate={{ width: phase === 'ANIMATING_RESULTS' ? '15vw' : '0vw' }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			/>

			<motion.div
				className="flex w-[130vw] h-full"
				animate={{ x: cameraX }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			>
				<div className="w-[30vw] h-full">{trainerA && <TrainerMenu trainer={trainerA} trainerKey="A" />}</div>

				{/* On ajoute un z-20 ici pour que la scène passe au-dessus du fond sombre pendant l'animation */}
				<div className="w-[70vw] h-full relative">
					<Scene />
				</div>

				<div className="w-[30vw] h-full">{trainerB && <TrainerMenu trainer={trainerB} trainerKey="B" />}</div>
			</motion.div>
		</div>
	);
};

export default Game;
