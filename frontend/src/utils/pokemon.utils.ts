import type { Pokemon } from "../types/pokemon.types";

export const PokemonUtils = {
    getSprite: (pokemon: Pokemon) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`,

    getBackSprite: (pokemon: Pokemon) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.id}.gif`,

    getImage: (pokemon: Pokemon) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
};