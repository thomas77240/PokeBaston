import { ActionType, type GameData, type GameStore, type GameTurnPayload, type TurnData } from '@/types/game.types';
import { create } from 'zustand';

// --- LE STORE ---
export const useGameStore = create<GameStore>((set, get) => ({
	phase: 'SELECTING_ACTIONS',
	currentTurnUI: 'A',
	pendingChoices: { A: null, B: null },
	gameId: '',
	trainerA: null,
	trainerB: null,

	initGame: async (id) => {
		// On sauvegarde le gameId dans le store immédiatement
		set({ gameId: id });

		try {
			const response = await fetch(`/api/battle/gamestate/${id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			const result : GameData = await response.json();

			set({
				trainerA: result.trainerA,
				trainerB: result.trainerB,
			});
		} catch (error) {
			console.error('Erreur lors du chargement de la partie', error);
		}
	},

	// 2. Action pour enregistrer le choix d'un joueur
	registerChoice: (player, choice) => {
		const state = get();
		const newChoices = { ...state.pendingChoices, [player]: choice };
		const bothReady = newChoices.A !== null && newChoices.B !== null;

		set({
			pendingChoices: newChoices,
			// Si les deux sont prêts, on bloque l'UI. Sinon, on passe au joueur suivant.
			phase: bothReady ? 'WAITING_FOR_SERVER' : 'SELECTING_ACTIONS',
			currentTurnUI: bothReady ? state.currentTurnUI : player === 'A' ? 'B' : 'A',
		});

		// Si les deux joueurs ont fait leur choix, on déclenche automatiquement l'appel API !
		if (bothReady) {
			get().submitTurnToBackend();
		}
	},

	// 3. Action Asynchrone (Appel au Back-end)
	submitTurnToBackend: async () => {
		const { pendingChoices } = get();

		if (!pendingChoices.A || !pendingChoices.B) {
			console.warn('Tentative de soumission alors que les choix ne sont pas complets');
			return;
		}

		try {
			const payload: GameTurnPayload = {
				gameId: get().gameId,
				actionA: pendingChoices?.A?.type,
				actionB: pendingChoices?.B?.type,
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

			const result : TurnData = await response.json();

			// On met à jour l'état avec la réponse du back
			set({
				phase: 'ANIMATING_RESULTS',
				trainerA: result.trainerA,
				trainerB: result.trainerB,
			});
		} catch (error) {
			console.error('Erreur lors de la résolution du tour', error);
			// Remettre l'état à SELECTING_ACTIONS en cas d'erreur
			set({
				phase: 'SELECTING_ACTIONS',
				currentTurnUI: 'A',
				pendingChoices: { A: null, B: null },
			});
		}
	},

	getTrainer: (key: 'A' | 'B') => {
		const state = get();
		return key === 'A' ? state.trainerA : state.trainerB;
	},

	startNextTurn: () =>
		set({
			phase: 'SELECTING_ACTIONS',
			currentTurnUI: 'A',
			pendingChoices: { A: null, B: null },
		}),
}));
