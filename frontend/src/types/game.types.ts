import type { PokemonMove, PokemonType } from "./pokemon.types";

export interface GamePokemon {
    id: number;
    name: string;
    type: PokemonType[];
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
    baseStats: {
        HP: number;
        ATK: number;
        DEF: number;
        SPA: number;
        SPD: number;
        SPE: number;
    };
    moves: GamePokemonMove[];
}

export interface GamePokemonMove extends Omit<PokemonMove,'PP'> {
    powerPoints: number;
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
    phase: 'SELECTING_ACTIONS' | 'WAITING_FOR_SERVER' | 'ANIMATING_RESULTS' |'WAITING_FOR_POKEMON_SELECTION_A ' | 'WAITING_FOR_POKEMON_SELECTION_B';
    currentTurnUI: 'A' | 'B';
    pendingChoices: { A: PlayerChoice | null; B: PlayerChoice | null };
    gameId: string;
    gameLevel: number;
    trainerA: GameTrainer | null;
    trainerB: GameTrainer | null;

    // Actions
    initGame: (id: string) => Promise<void>;
    getTrainer: (key: 'A' | 'B') => GameTrainer | null;
    registerChoice: (player: 'A' | 'B', choice: PlayerChoice) => void;
    submitTurnToBackend: () => Promise<void>;
    handleAnimation: (turnResult: TurnDataResponse) => void;
    startNextTurn: () => void;
}

export type GameDataResponse = {
    gameId: string;
    gameLevel: number;
    trainerA: GameTrainer;
    trainerB: GameTrainer;
};

export type TurnDataResponse = GameDataResponse & {
    logs: BatlleLog[];
};

export type GameAction =
    | { type: 'REGISTER_CHOICE'; payload: { player: 'A' | 'B'; choice: PlayerChoice } }
    | { type: 'SERVER_RESPONSE'; payload: { newBattleData: unknown } }
    | { type: 'START_NEXT_TURN' };



export type BatlleLog = AttackLog | SwitchLog | KOLog;

export type AttackLog = {
    type: 'ATTACK';
    trainer: 'A' | 'B';
    logs: string[];
}

export type SwitchLog = {
    type: 'SWITCH';
    trainer: 'A' | 'B';
    logs: string[];
}

export type KOLog = {
    type: 'KO';
    trainer: 'A' | 'B';
    logs: string[];
}
