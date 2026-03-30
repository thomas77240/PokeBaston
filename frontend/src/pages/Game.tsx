import Scene from '@/components/Game/Stage';
import TrainerDashboard from '@/components/Game/TrainerMenu';
import { motion } from 'framer-motion';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';

const Game = () => {
	// const { gameId } = useParams();

	// État pour savoir qui est en train de jouer
	const [currentPlayer, setCurrentPlayer] = useState<'A' | 'B'>('A');

	const switchTurn = () => {
		setCurrentPlayer((prev) => (prev === 'A' ? 'B' : 'A'));
	};

	return (
		<div className="overflow-hidden relative w-screen h-screen bg-black">
			{/* BOUTON TEMPORAIRE : Pour tester le slide, à retirer plus tard */}
			<button
				className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white text-black rounded shadow"
				onClick={switchTurn}
			>
				Changer de tour (Actuel : {currentPlayer})
			</button>

			{/* CONTENEUR PRINCIPAL : Fait 140vw de large (40vw + 60vw + 40vw) */}
			<motion.div
				className="flex w-[140vw] h-full"
				// Si c'est A, position X à 0. Si c'est B, on décale de la largeur d'un menu vers la gauche (-40vw).
				animate={{ x: currentPlayer === 'A' ? '0vw' : '-40vw' }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			>
				{/* COLONNE 1 : Menu Joueur 1 (A) */}
				<div className="w-[40vw] h-full bg-[#e5e5e5]">
					<TrainerDashboard trainer="A" />
				</div>

				{/* COLONNE 2 : Scène de jeu (Le centre qui reste toujours visible) */}
				<div className="w-[60vw] h-full relative">
					<Scene />
				</div>

				{/* COLONNE 3 : Menu Joueur 2 (B) */}
				<div className="w-[40vw] h-full bg-[#e5e5e5]">
					<TrainerDashboard trainer="B" />
				</div>
			</motion.div>
		</div>
	);
};

export default Game;
