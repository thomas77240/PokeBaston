import type { GameTrainer } from '@/types/game.types';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Swords, Users } from 'lucide-react';
import TeamView from './TeamView';
import AttacksView from './AttacksView';
import { useGameStore } from '@/stores/useGameStore';

interface TrainerMenuProps {
    trainer: GameTrainer;
    trainerKey: 'A' | 'B';
}

const TrainerMenu = ({ trainer, trainerKey }: TrainerMenuProps) => {
    const { phase, getWaitingForReplacement } = useGameStore();
    const waitingFor = getWaitingForReplacement();

    const [activeView, setActiveView] = useState<'home' | 'team' | 'attacks'>(
        phase === 'WAITING_FOR_TURN' ? 'home' : waitingFor === trainerKey ? 'team' : 'home'
    );

    const [prevPhase, setPrevPhase] = useState(phase);

    if (phase !== prevPhase) {
        setPrevPhase(phase);
        if (phase === 'WAITING_FOR_TURN') {
            setActiveView('home');
        } else if (waitingFor === trainerKey) {
            setActiveView('team');
        } else {
            setActiveView('home');
        }
    }

    if (waitingFor && waitingFor !== trainerKey) {
        return null;
    }

    const xEnter = trainerKey === 'A' ? '-100%' : '100%';
    const xExit = trainerKey === 'A' ? '-100%' : '100%';

    return (
        <div className="w-full h-full relative overflow-hidden bg-background-300">
            <AnimatePresence initial={false} mode="wait">
                {/* VUE HOME */}
                {activeView === 'home' && (
                    <motion.div
                        key="home"
                        initial={{ x: xEnter, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: xExit, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute inset-0 flex flex-col p-8"
                    >
                        {/* En-tête de la vue Home */}
                        <div className="flex flex-col items-center justify-center mb-10 mt-auto">
                            <h2 className="font-title text-4xl font-black text-neutral-800 text-center leading-tight">
                                Dresseur {trainer.name}
                            </h2>
                            <p className="text-md font-main text-neutral-600 mt-2 text-center">
                                Que voulez-vous faire ?
                            </p>
                        </div>

                        {/* Grille de boutons */}
                        <div className="flex w-full flex-col gap-4 max-w-sm mx-auto mb-auto">
                            <button
                                onClick={() => setActiveView('attacks')}
                                className="group relative flex items-center justify-between overflow-hidden bg-background-50 border-background-600 border-2 py-5 px-6 cursor-pointer rounded-2xl shadow transition-all duration-300 hover:-translate-y-1 active:scale-95"
                            >
                                <span className="font-title text-xl font-bold text-neutral-800">Attaquer</span>
                                <div className="bg-background-100 p-2 rounded-xl group-hover:bg-red-100 transition-colors">
                                    <Swords
                                        size={24}
                                        className="text-neutral-700 group-hover:text-red-500 transition-colors"
                                    />
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveView('team')}
                                className="group relative flex items-center justify-between overflow-hidden bg-background-50 border-background-600 border-2 py-5 px-6 cursor-pointer rounded-2xl shadow transition-all duration-300 hover:-translate-y-1 active:scale-95"
                            >
                                <span className="font-title text-xl font-bold text-neutral-800">Équipe</span>
                                <div className="bg-background-100 p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
                                    <Users
                                        size={24}
                                        className="text-neutral-700 group-hover:text-blue-500 transition-colors"
                                    />
                                </div>
                            </button>
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
                        className="absolute inset-0 bg-background-200"
                    >
                        <TeamView
                            trainerKey={trainerKey}
                            activePokemon={
                                trainer?.activePokemon !== undefined && trainer?.activePokemon !== null
                                    ? trainer.team[trainer.activePokemon]
                                    : null
                            }
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
                        className="absolute inset-0 bg-background-200"
                    >
                        <AttacksView
                            trainerKey={trainerKey}
                            activePokemon={
                                trainer?.activePokemon !== undefined && trainer?.activePokemon !== null
                                    ? trainer.team[trainer.activePokemon]
                                    : null
                            }
                            goBack={() => setActiveView('home')}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TrainerMenu;