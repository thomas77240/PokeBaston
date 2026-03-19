import type { Pokemon } from './pokemon.types';

export interface GameTrainers {
	trainerA: {
		name: string;
		team: Pokemon[];
	};
	trainerB: {
		name: string;
		team: Pokemon[];
	};
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
	addPokemon: (trainer: 'A' | 'B', pokemon: Pokemon) => void;
	removePokemon: (trainer: 'A' | 'B', pokemon: Pokemon) => void;
	changeName: (trainer: 'A' | 'B', name: string) => void;
	submitSetup: () => void;
}

export interface GameSetupDTO {
	level: number;
	trainerA: {
		name: string;
		pokemonIds: number[];
	};
	trainerB: {
		name: string;
		pokemonIds: number[];
	};
}
