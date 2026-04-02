import type { PokemonMove, PokemonType } from "./pokemon.types";

export interface GamePokemon {
    id: number;
    name: string;
    type: PokemonType[];
    SPE: number;
    HP: number;
    ATK: number;
    DEF: number;
    SPA: number;
    SPD: number;
    maxHP: number;
    moves: PokemonMove[];
}

export interface GameTrainer {
    name: string;
    team: GamePokemon[];
    activePokemon: number;
}

export const ActionType = {
  ATTACK: 'ATTACK',
  SWITCH: 'SWITCH'
} as const;

export type ActionType = typeof ActionType[keyof typeof ActionType];

export interface GameTurnPayload {
  gameId: string;
  actionA: ActionType;
  actionB: ActionType;
  moveTrainerA?: number;
  moveTrainerB?: number;
  newPokemonA?: number;
  newPokemonB?: number;
}

export type PlayerChoice =
    | { type: typeof ActionType.ATTACK; moveId: number }
    | { type: typeof ActionType.SWITCH; pokemonId: number };

export interface GameStore {
    // Variables d'état
    phase: 'SELECTING_ACTIONS' | 'WAITING_FOR_SERVER' | 'ANIMATING_RESULTS';
    currentTurnUI: 'A' | 'B';
    pendingChoices: { A: PlayerChoice | null; B: PlayerChoice | null };
    gameId: string;
    trainerA: GameTrainer | null;
    trainerB: GameTrainer | null;

    // Actions
    initGame: (id: string) => Promise<void>;
    getTrainer: (key: 'A' | 'B') => GameTrainer | null;
    registerChoice: (player: 'A' | 'B', choice: PlayerChoice) => void;
    submitTurnToBackend: () => Promise<void>;
    startNextTurn: () => void;
}

export type GameData = {
    gameId: string;
    trainerA: GameTrainer;
    trainerB: GameTrainer;
};

export type TurnData = GameData & {
    logs: string[];
};

export type GameAction =
    | { type: 'REGISTER_CHOICE'; payload: { player: 'A' | 'B'; choice: PlayerChoice } }
    | { type: 'SERVER_RESPONSE'; payload: { newBattleData: unknown } }
    | { type: 'START_NEXT_TURN' };