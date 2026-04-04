import type { GameTrainer } from '@/types/game.types';
import { useState } from 'react';
import Button from '../ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import TeamView from './TeamView';
import AttacksView from './AttacksView';

interface TrainerMenuProps {
	trainer: GameTrainer;
	trainerKey: 'A' | 'B';
}

const TrainerMenu = ({ trainer, trainerKey }: TrainerMenuProps) => {
	const [activeView, setActiveView] = useState<'home' | 'team' | 'attacks'>('home');

	const xEnter = trainerKey === 'A' ? '-100%' : '100%';
	const xExit = trainerKey === 'A' ? '-100%' : '100%';

	return (
		<div className="w-full h-full relative overflow-hidden bg-background-300 border-x border-background-600">
			<AnimatePresence initial={false}>
				{/* VUE HOME */}
				{activeView === 'home' && (
					<motion.div
						key="home"
						initial={{ x: xEnter, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: xExit, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute inset-0 flex flex-col justify-center items-center"
					>
						<h2 className="font-title text-3xl mb-12">Que voulez vous faire, {trainer.name} ?</h2>

						<div className="flex w-full flex-col gap-6">
							<Button
								onClick={() => setActiveView('attacks')}
								className={`text-xl font-medium tracking-wide py-4 max-w-sm mx-auto w-full transition-all duration-300 not-disabled:shadow-lg not-disabled:hover:shadow-xl translate-x-0 not-disabled:hover:-translate-y-1`}
							>
								Attaquer
							</Button>
							<Button
								onClick={() => setActiveView('team')}
								className={`text-xl font-medium tracking-wide py-4 max-w-sm mx-auto w-full transition-all duration-300 not-disabled:shadow-lg not-disabled:hover:shadow-xl translate-x-0 not-disabled:hover:-translate-y-1`}
							>
								Équipe
							</Button>
						</div>
					</motion.div>
				)}

				{/* VUE TEAM */}
				{activeView === 'team' && (
					<motion.div
						key="team"
						initial={{ x: xEnter, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: xExit, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute inset-0"
					>
						<TeamView
							trainerKey={trainerKey}
							activePokemon={trainer.team[trainer.activePokemon]}
							goBack={() => setActiveView('home')}
						/>
					</motion.div>
				)}

				{/* VUE ATTACKS */}
				{activeView === 'attacks' && (
					<motion.div
						key="attacks"
						initial={{ x: xEnter, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: xExit, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="absolute inset-0 h-full border-blue-400"
					>
						<AttacksView
							trainerKey={trainerKey}
							activePokemon={trainer.team[trainer.activePokemon]}
							goBack={() => setActiveView('home')}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TrainerMenu;
