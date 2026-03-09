import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import type { GameTeams, GameSettings } from '../types/gameSetup.types';
import type { Pokemon } from '../types/pokemon.types';

const CreateGameLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [teams, setTeams] = useState<GameTeams>({ player1: { team: [] }, player2: { team: [] } });
	const [settings, setSettings] = useState<GameSettings>({ mode: 'local', level: 50 });
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Navigation
	const steps = ['/setup', '/setup/player-1', '/setup/player-2'];
	const direction = location.state?.direction || 1;
	const currentIndex = steps.indexOf(location.pathname);
	const nextStep = () => {
		if (currentIndex < steps.length - 1) {
			navigate(steps[currentIndex + 1], { state: { direction: 1 } });
		}
	};

	const prevStep = () => {
		if (currentIndex > 0) {
			navigate(steps[currentIndex - 1], { state: { direction: -1 } });
		}
	};

	// Ajouter un pokemon à une équipe
	const addPokemon = (player: 1 | 2, pokemon: Pokemon) => {
		const playerKey = `player${player}` as const;

		if (teams[playerKey].team.length >= 6) return;
		if (teams[playerKey].team.some((p) => p.id === pokemon.id)) return;

		setTeams((prev) => ({
			...prev,
			[playerKey]: {
				...prev[playerKey],
				team: [...prev[playerKey].team, pokemon],
			},
		}));
	};

	// Supprimer un pokemon d'une équipe
	const removePokemon = (player: 1 | 2, pokemon: Pokemon) => {
		const playerKey = `player${player}` as const;

		setTeams((prev) => ({
			...prev,
			[playerKey]: {
				...prev[playerKey],
				team: [...prev[playerKey].team.filter((p) => p.id !== pokemon.id)],
			},
		}));
	};

	const contextValue = {
		teams,
		settings,
		setSettings,
		isSubmitting,
		setIsSubmitting,
		nextStep,
		prevStep,
		addPokemon,
		removePokemon,
	};

	const currentOutlet = useOutlet(contextValue);

	return (
		<div className="overflow-hidden relative w-full h-screen">
			<AnimatePresence custom={direction} initial={false}>
				<motion.div
					className="p-8 absolute inset-0"
					key={location.pathname}
					custom={direction}
					variants={{
						enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
						center: { x: 0, opacity: 1 },
						exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
					}}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 0.4, ease: 'easeInOut' }}
				>
					{currentOutlet}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default CreateGameLayout;
