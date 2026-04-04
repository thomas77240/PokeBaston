// Game.tsx
import Scene from '@/components/Game/Stage';
import TrainerMenu from '@/components/Game/TrainerMenu';
import { useGameStore } from '@/stores/useGameStore';
import { motion } from 'framer-motion';
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

	useEffect(() => {
		if (gameId) {
			initGame(gameId);
		}
	}, [gameId, initGame]);

	const switchTurn = () => {
		useGameStore.setState((prev) => ({
			currentTurnUI: prev.currentTurnUI === 'A' ? 'B' : 'A',
		}));
	};

	// Calcul de la position de la caméra
	let cameraX = '0vw';
	if (phase === 'ANIMATING_RESULTS') {
		cameraX = '-15vw'; // Centre parfaitement la zone de 70vw
	} else {
		cameraX = currentPlayer === 'A' ? '0vw' : '-30vw';
	}

	return (
		<div className="overflow-hidden relative w-screen h-screen bg-black">
			<button
				className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white text-black rounded shadow"
				onClick={switchTurn}
			>
				Changer de tour (Actuel : {currentPlayer})
			</button>

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
				<div className="w-[30vw] h-full">
					{trainerA && <TrainerMenu trainer={trainerA} trainerKey="A" />}
				</div>

				{/* On ajoute un z-20 ici pour que la scène passe au-dessus du fond sombre pendant l'animation */}
				<div className="w-[70vw] h-full relative">
					<Scene />
				</div>

				<div className="w-[30vw] h-full">
					{trainerB && <TrainerMenu trainer={trainerB} trainerKey="B" />}
				</div>
			</motion.div>
		</div>
	);
};

export default Game;
