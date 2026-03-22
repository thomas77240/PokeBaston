import type { Pokemon } from '../types/pokemon.types';

type PokemonColorVariants = {
	base: string;
	border: string;
	contrastText: string;
};

export const PokemonUtils = {
	getSprite: (pokemon: Pokemon): string =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`,

	getBackSprite: (pokemon: Pokemon): string =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.id}.gif`,

	getImage: (pokemon: Pokemon): string =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,

	getPokemonColors: (type: string): PokemonColorVariants => {
		const colors: Record<string, PokemonColorVariants> = {
			Normal: {
				base: 'pokemon-normal',
				border: 'border-pokemon-normal',
				contrastText: 'text-white',
			},
			Combat: {
				base: 'pokemon-fighting',
				border: 'border-pokemon-fighting',
				contrastText: 'text-white',
			},
			Vol: {
				base: 'pokemon-flying',
				border: 'border-pokemon-flying',
				contrastText: 'text-white',
			},
			Poison: {
				base: 'pokemon-poison',
				border: 'border-pokemon-poison',
				contrastText: 'text-white',
			},
			Sol: {
				base: 'pokemon-ground',
				border: 'border-pokemon-ground',
				contrastText: 'text-neutral-900',
			},
			Roche: {
				base: 'pokemon-rock',
				border: 'border-pokemon-rock',
				contrastText: 'text-white',
			},
			Insecte: {
				base: 'pokemon-bug',
				border: 'border-pokemon-bug',
				contrastText: 'text-white',
			},
			Spectre: {
				base: 'pokemon-ghost',
				border: 'border-pokemon-ghost',
				contrastText: 'text-white',
			},
			Acier: {
				base: 'pokemon-steel',
				border: 'border-pokemon-steel',
				contrastText: 'text-neutral-900',
			},
			Feu: {
				base: 'pokemon-fire',
				border: 'border-pokemon-fire',
				contrastText: 'text-white',
			},
			Eau: {
				base: 'pokemon-water',
				border: 'border-pokemon-water',
				contrastText: 'text-white',
			},
			Plante: {
				base: 'pokemon-grass',
				border: 'border-pokemon-grass',
				contrastText: 'text-white',
			},
			Électrik: {
				base: 'pokemon-electric',
				border: 'border-pokemon-electric',
				contrastText: 'text-neutral-900', // Sombre pour le contraste
			},
			Psy: {
				base: 'pokemon-psychic',
				border: 'border-pokemon-psychic',
				contrastText: 'text-white',
			},
			Glace: {
				base: 'pokemon-ice',
				border: 'border-pokemon-ice',
				contrastText: 'text-neutral-900', // Sombre pour le contraste
			},
			Dragon: {
				base: 'pokemon-dragon',
				border: 'border-pokemon-dragon',
				contrastText: 'text-white',
			},
			Ténèbres: {
				base: 'pokemon-dark',
				border: 'border-pokemon-dark',
				contrastText: 'text-white',
			},
			Fée: {
				base: 'pokemon-fairy',
				border: 'border-pokemon-fairy',
				contrastText: 'text-neutral-900', // Sombre pour le contraste
			},
			// ... Ajoute les autres types sur le même modèle ...
		};

		// Les couleurs par défaut si le type n'est pas trouvé
		return (
			colors[type] || {
				base: 'neutral-500',
				border: 'border-neutral-500',
				contrastText: 'text-white',
			}
		);
	},
};
