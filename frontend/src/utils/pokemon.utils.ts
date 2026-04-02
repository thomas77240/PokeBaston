import type { GamePokemon } from '@/types/game.types';
import type { Pokemon, PokemonType } from '../types/pokemon.types';

export const PokemonUtils = {
	getSprite: (pokemon: Pokemon | GamePokemon): string =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`,

	getBackSprite: (pokemon: Pokemon | GamePokemon): string =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.id}.gif`,

	getImage: (pokemon: Pokemon | GamePokemon): string =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,

	getPokemonColorVar: (type: string): string => {
		const colors: Record<PokemonType, string> = {
			Normal: 'var(--color-pokemon-normal)',
			Combat: 'var(--color-pokemon-fighting)',
			Vol: 'var(--color-pokemon-flying)',
			Poison: 'var(--color-pokemon-poison)',
			Sol: 'var(--color-pokemon-ground)',
			Roche: 'var(--color-pokemon-rock)',
			Insecte: 'var(--color-pokemon-bug)',
			Spectre: 'var(--color-pokemon-ghost)',
			Acier: 'var(--color-pokemon-steel)',
			Feu: 'var(--color-pokemon-fire)',
			Eau: 'var(--color-pokemon-water)',
			Plante: 'var(--color-pokemon-grass)',
			Électrik: 'var(--color-pokemon-electric)',
			Psy: 'var(--color-pokemon-psychic)',
			Glace: 'var(--color-pokemon-ice)',
			Dragon: 'var(--color-pokemon-dragon)',
			Ténèbres: 'var(--color-pokemon-dark)',
			Fée: 'var(--color-pokemon-fairy)',
		};

		return colors[type] || 'neutral-500';
	},
};
