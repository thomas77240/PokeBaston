import type { Pokemon, PokemonMove } from './pokemon.types';

export interface Trainer {
	name: string;
	team: {
		pokemon: Pokemon;
		moves: PokemonMove[];
	}[];
}

export interface GameTrainers {
	trainerA: Trainer
	trainerB: Trainer
}

export interface GameSettings {
	level: number;
}

export interface GameSetupContextType {
	trainers: GameTrainers;
	settings: GameSettings;
	setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
	setGameTeams: React.Dispatch<React.SetStateAction<GameTrainers>>;
	nextStep: () => void;
	prevStep: () => void;
	addPokemon: (trainer: 'A' | 'B', pokemon: Pokemon, moves: PokemonMove[]) => void;
	removePokemon: (trainer: 'A' | 'B', pokemon: Pokemon) => void;
	changeName: (trainer: 'A' | 'B', name: string) => void;
	submitSetup: () => void;
	isSubmitting: boolean,
	setIsSubmitting: (bool: boolean) => void,
}

export interface GameSetupDTO {
	level: number;
	trainerA: {
		name: string;
		pokemons: {
			id: number;
			movesIds: number[];
		}[];
	};
	trainerB: {
		name: string;
		pokemons: {
			id: number;
			movesIds: number[];
		}[];
	};
}
