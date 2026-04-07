import {
	ActionType,
	type GameDataResponse,
	type GameStore,
	type GameTurnPayload,
	type TurnDataResponse,
} from '@/types/game.types';
import wait from '@/utils/wait';
import { create } from 'zustand';

// --- LE STORE ---
export const useGameStore = create<GameStore>((set, get) => ({
	phase: 'WAITING_FOR_TURN',
	currentTurnUI: 'A',
	pendingChoices: { A: null, B: null },
	gameId: '',
	gameLevel: 50,
	trainerA: null,
	trainerB: null,
	winner: undefined,
	isLoading: true,
	attacking: null,
	takingDamage: null,

	initGame: async (id) => {
		set({ gameId: id, isLoading: true });

		try {
			const response = await fetch(`/api/battle/gamestate/${id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			const result: GameDataResponse = await response.json();
			if (result.gameId !== id) {
				throw new Error('Game ID différent de celui demandé');
			}

			await wait(1000);
			if (result.gameStatus !== 'FINISHED') {
				set({ winner: result.trainerA.activePokemon === null ? result.trainerA : result.trainerB });
			}
			console.log(get().winner);
			set({
				trainerA: result.trainerA,
				trainerB: result.trainerB,
				gameLevel: result.gameLevel,
				phase: result.gameStatus,
				currentTurnUI: result.gameStatus === 'WAITING_FOR_TURN' ? 'A' : get().getWaitingForReplacement() || 'A',
				pendingChoices: { A: null, B: null },
				currentLog: undefined,
				winner: result.winner === 'A' ? result.trainerA : result.winner === 'B' ? result.trainerB : undefined,
			});

			wait(500).then(() => set({ isLoading: false }));
		} catch (error) {
			window.location.href = '/';
			console.error('Erreur lors du chargement de la partie', error);
		}
	},

	// 2. Action pour enregistrer le choix d'un joueur
	registerChoice: (player, choice) => {
		const state = get();
		const newChoices = { ...state.pendingChoices, [player]: choice };

		// On vérifie de qui on attend le remplacement
		const replacementNeeded = state.getWaitingForReplacement();

		let isReadyToSubmit = false;
		let nextUI = state.currentTurnUI;

		if (replacementNeeded) {
			// Cas d'un K.O. : on est prêt dès que le joueur concerné a choisi
			isReadyToSubmit = newChoices[replacementNeeded] !== null;
			nextUI = replacementNeeded;
		} else {
			// Tour classique : on est prêt quand A et B ont choisi
			isReadyToSubmit = newChoices.A !== null && newChoices.B !== null;
			nextUI = isReadyToSubmit ? state.currentTurnUI : player === 'A' ? 'B' : 'A';
		}

		set({
			pendingChoices: newChoices,
			currentTurnUI: nextUI,
		});

		if (isReadyToSubmit) {
			get().submitTurnToBackend();
		}
	},

	// 3. Action Asynchrone (Appel au Back-end)
	submitTurnToBackend: async () => {
		const state = get();
		const { pendingChoices } = state;

		const replacementNeeded = state.getWaitingForReplacement();

		const isPayloadValid = replacementNeeded
			? pendingChoices[replacementNeeded] !== null
			: pendingChoices.A !== null && pendingChoices.B !== null;

		if (!isPayloadValid) {
			console.warn('Tentative de soumission alors que les choix ne sont pas complets');
			return;
		}

		set({ phase: 'WAITING_FOR_SERVER' });

		try {
			const payload: GameTurnPayload = {
				gameId: state.gameId,
				actionA: pendingChoices.A?.type as ActionType,
				actionB: pendingChoices.B?.type as ActionType,
				...(pendingChoices.A?.type === ActionType.ATTACK && { moveTrainerA: pendingChoices.A.moveId }),
				...(pendingChoices.B?.type === ActionType.ATTACK && { moveTrainerB: pendingChoices.B.moveId }),
				...(pendingChoices.A?.type === ActionType.SWITCH && { newPokemonA: pendingChoices.A.pokemonId }),
				...(pendingChoices.B?.type === ActionType.SWITCH && { newPokemonB: pendingChoices.B.pokemonId }),
			};

			const response = await fetch('/api/battle/turn', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			const result: TurnDataResponse = await response.json();

			// On met à jour l'état avec la réponse du back
			set({ phase: 'ANIMATING_RESULTS' });
			get().handleAnimation(result);
		} catch (error) {
			console.error('Erreur lors de la résolution du tour', error);
			get().initGame(get().gameId);
		}
	},

	getWaitingForReplacement() {
		const state = get();
		if (state.phase === 'WAITING_FOR_A_TO_SWITCH') return 'A';
		if (state.phase === 'WAITING_FOR_B_TO_SWITCH') return 'B';
		return null;
	},

	handleAnimation: async (turnResult: TurnDataResponse) => {
		const logs = turnResult.logs;
		let willNeedReplacement: 'A' | 'B' | null = null;
		for (const log of logs) {
			const trainerKey = log.trainer === 'A' ? 'trainerA' : 'trainerB';
			const opponentKey = trainerKey === 'trainerA' ? 'trainerB' : 'trainerA';
			for (const textLog of log.logs) {
				// Cas ou c'est une animatiion
				if (textLog === '_ANIMATION_') {
					switch (log.type) {
						case 'SWITCH':
							set((state) => ({
								[trainerKey]: state[trainerKey] ? { ...state[trainerKey]!, activePokemon: null } : null,
							}));
							await wait(2000);
							set((state) => ({
								[trainerKey]: state[trainerKey]
									? { ...state[trainerKey], activePokemon: turnResult[trainerKey].activePokemon }
									: null,
							}));
							continue;
						case 'ATTACK': {
							const attacker = trainerKey === 'trainerA' ? 'A' : 'B';
							const defender = trainerKey === 'trainerA' ? 'B' : 'A';

							set({ attacking: attacker });
							await wait(400); // Durée du dash

							set({ attacking: null, takingDamage: defender });
							await wait(400); // Durée du clignotement rouge

							set((state) => {
								const trainer = state[opponentKey];
								if (!trainer) return {};
								const activeIndex = trainer.activePokemon!;
								const updatedPokemonData = turnResult[opponentKey].team[activeIndex];
								const newTeam = trainer.team.map((pokemon, idx) =>
									idx === activeIndex ? { ...pokemon, ...updatedPokemonData } : pokemon,
								);

								return {
									[opponentKey]: {
										...trainer,
										team: newTeam,
									},
								};
							});

							await wait(1000);
							set({ takingDamage: null });
							continue;
						}
						case 'KO':
							await wait(2000);
							set((state) => ({
								[trainerKey]: state[trainerKey] ? { ...state[trainerKey]!, activePokemon: null } : null,
							}));
							willNeedReplacement = trainerKey === 'trainerA' ? 'A' : 'B';
							continue;
						default:
							await wait(1000); // Petite pause pour laisser le temps de lire le log
							break;
					}

					continue;
				}

				set({ currentLog: textLog });
				await wait(1500);

				if (log.type === 'ENDGAME') {
					set({
						phase: 'FINISHED',
						winner: log.trainer == 'A' ? turnResult.trainerB : turnResult.trainerA,
						trainerA: turnResult.trainerA,
						trainerB: turnResult.trainerB,
					});
					return;
				}
			}
		}

		const { phase } = get();
		if (willNeedReplacement !== null && phase !== 'FINISHED') {
			set({
				phase: `WAITING_FOR_${willNeedReplacement}_TO_SWITCH` as const,
				currentTurnUI: willNeedReplacement,
				pendingChoices: { A: null, B: null },
			});
		} else {
			get().startNextTurn();
		}
	},

	getTrainer: (key: 'A' | 'B') => {
		const state = get();
		return key === 'A' ? state.trainerA : state.trainerB;
	},

	startNextTurn: () =>
		set({
			phase: 'WAITING_FOR_TURN',
			currentTurnUI: get().getWaitingForReplacement() || 'A',
			pendingChoices: { A: null, B: null },
		}),
}));
