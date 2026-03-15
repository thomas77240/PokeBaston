import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import type { GameTrainers, GameSettings, GameSetupDTO } from '../types/gameSetup.types';
import type { Pokemon } from '../types/pokemon.types';

const CreateGameLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [trainers, setTrainers] = useState<GameTrainers>({
		trainerA: { name: '', team: [] },
		trainerB: { name: '', team: [] },
	});
	const [settings, setSettings] = useState<GameSettings>({ mode: 'local', level: 50 });
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Navigation
	const steps = ['', '/trainer-1', '/trainer-2', '/summary'].map(path => '/setup' + path);
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
	const addPokemon = (trainer: 'A' | 'B', pokemon: Pokemon) => {
		const trainerKey = `trainer${trainer}` as const;

		if (trainers[trainerKey].team.length >= 6) return;
		if (trainers[trainerKey].team.some((p) => p.id === pokemon.id)) return;

		setTrainers((prev) => ({
			...prev,
			[trainerKey]: {
				...prev[trainerKey],
				team: [...prev[trainerKey].team, pokemon],
			},
		}));
	};

	// Supprimer un pokemon d'une équipe
	const removePokemon = (trainer: 'A' | 'B', pokemon: Pokemon) => {
		const trainerKey = `trainer${trainer}` as const;

		setTrainers((prev) => ({
			...prev,
			[trainerKey]: {
				...prev[trainerKey],
				team: [...prev[trainerKey].team.filter((p) => p.id !== pokemon.id)],
			},
		}));
	};

	// Changer pseudo
	const changeName = (trainer: 'A' | 'B', name: string) => {
		const trainerKey = `trainer${trainer}` as const;
		setTrainers((prev) => ({
			...prev,
			[trainerKey]: {
				...prev[trainerKey],
				name: name,
			},
		}));
	};

	// Envoyer requete pour créer partie
	const submitSetup = async () => {
		const payload: GameSetupDTO = {
			level: settings.level,
			trainerA: {
				name: 'dqsds',
				pokemonIds: trainers['trainerA'].team.map((p) => p.id),
			},
			trainerB: {
				name: 'dqsds',
				pokemonIds: trainers['trainerB'].team.map((p) => p.id),
			},
		};
		const request = await fetch('/api/battle/start', {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json',
            },
			body: JSON.stringify(payload),
		});
		if (request.ok) {
            const data = await request.json();
            console.log("Partie créée :", data);
        } else {
            console.error("Erreur lors de la création :", request.statusText);
        }
	};

	const contextValue = {
		trainers,
		settings,
		setSettings,
		isSubmitting,
		setIsSubmitting,
		nextStep,
		prevStep,
		addPokemon,
		removePokemon,
		changeName,
		submitSetup,
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
