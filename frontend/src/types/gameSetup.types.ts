import type { Pokemon } from "./pokemon.types";


export interface GameTeams {
  player1 : {
    team: Pokemon[]
  },
  player2 : {
    team: Pokemon[]
  }
}

export const GAME_MODES = [
    'local' , 'online'
]

export interface GameSettings {
  mode: (typeof GAME_MODES)[number]
  level: number
}

export interface GameSetupContextType {
  teams: GameTeams;
  settings: GameSettings,
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  setGameTeams: React.Dispatch<React.SetStateAction<GameTeams>>;
  nextStep: () => void;
  prevStep: () => void;
  addPokemon: (player: number, pokemon: Pokemon) => void;
  removePokemon: (player: number, pokemon: Pokemon) => void;
}