import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import type { GameTrainers, GameSettings, GameSetupDTO } from '../types/gameSetup.types';
import type { Pokemon, PokemonMove } from '../types/pokemon.types';

const STEPS = ['', '/trainer-1', '/trainer-2', '/summary'].map((path) => '/setup' + path);

const CreateGameLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [trainers, setTrainers] = useState<GameTrainers>({
		trainerA: { name: '', team: [] },
		trainerB: { name: '', team: [] },
	});
	const [settings, setSettings] = useState<GameSettings>({ level: 50 });
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Navigation
	const direction = location.state?.direction || 1;
	const currentIndex = STEPS.indexOf(location.pathname);

	// Validation étape de navigation (conditions pour afficher cette page)
	const canAccessStep = useCallback(
		(stepIndex: number) => {
			if (stepIndex === 0) return true; // Paramètres

			if (stepIndex === 1) return trainers.trainerA.name && trainers.trainerB.name; // Equipe 1

			if (stepIndex === 2) {
				return trainers.trainerA.team.length > 0; // Equipe 2
			}

			if (stepIndex === 3) {
				return trainers.trainerA.team.length > 0 && trainers.trainerB.team.length > 0; // Résumé
			}

			return false;
		},
		[trainers.trainerA.team.length, trainers.trainerB.team.length, trainers.trainerA.name, trainers.trainerB.name],
	);

	useEffect(() => {
		if (currentIndex === -1) {
			navigate(STEPS[0], { replace: true });
			return;
		}

		if (!canAccessStep(currentIndex)) {
			navigate(STEPS[0], { replace: true });
		}
	}, [currentIndex, canAccessStep, navigate]);

	const nextStep = () => {
		if (currentIndex < STEPS.length - 1) {
			if (canAccessStep(currentIndex + 1)) {
				navigate(STEPS[currentIndex + 1], { state: { direction: 1 } });
			}
		}
	};

	const prevStep = () => {
		if (currentIndex > 0) {
			navigate(STEPS[currentIndex - 1], { state: { direction: -1 } });
		}
	};

	// Ajouter un pokemon à une équipe
	const addPokemon = (trainer: 'A' | 'B', pokemon: Pokemon, moves: PokemonMove[]) => {
		const trainerKey = `trainer${trainer}` as const;

		setTrainers((prev) => {
			const currentTeam = prev[trainerKey].team;
			const existingIndex = currentTeam.findIndex((member) => member.pokemon.id === pokemon.id);

			if (existingIndex !== -1) {
				// Pokemon déja dans l'équipe

				const updatedTeam = [...currentTeam];
				updatedTeam[existingIndex] = {
					...updatedTeam[existingIndex],
					moves,
				};

				return {
					...prev,
					[trainerKey]: {
						...prev[trainerKey],
						team: updatedTeam,
					},
				};
			} else {
				// Nouveau Pokemon

				if (currentTeam.length >= 6) {
					return prev; // Equipe pleine
				}

				return {
					...prev,
					[trainerKey]: {
						...prev[trainerKey],
						team: [...currentTeam, { pokemon, moves }],
					},
				};
			}
		});
	};

	// Supprimer un pokemon d'une équipe
	const removePokemon = (trainer: 'A' | 'B', pokemon: Pokemon) => {
		const trainerKey = `trainer${trainer}` as const;

		setTrainers((prev) => ({
			...prev,
			[trainerKey]: {
				...prev[trainerKey],
				team: [...prev[trainerKey].team.filter((member) => member.pokemon.id !== pokemon.id)],
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
				name: trainers['trainerA'].name,
				pokemons: trainers['trainerA'].team.map((member) => {
					return {
						id: member.pokemon.id,
						movesIds: member.moves.map((move) => move.id),
					};
				}),
			},
			trainerB: {
				name: trainers['trainerB'].name,
				pokemons: trainers['trainerB'].team.map((member) => {
					return {
						id: member.pokemon.id,
						movesIds: member.moves.map((move) => move.id),
					};
				}),
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
			console.log('Partie créée :', data);
		} else {
			console.error('Erreur lors de la création :', request.statusText);
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
					className="absolute inset-0"
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
