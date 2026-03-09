export type Pokemon = {
    id: number;
    name: string;
    image: string;
    sprite: string;
    types: {name: PokemonType}[];
    stats: PokemonStats;
    resistances: PokemonResistance[];
}



export const POKEMON_TYPES = [
    'Poison' , 'Plante' , 'Feu' , 'Vol' , 'Eau' , 'Insecte' , 'Normal' , 'Électrik' , 'Sol'
]
export type PokemonType = (typeof POKEMON_TYPES)[number];

export interface PokemonStats {
    HP: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

export interface PokemonResistance {
    name: PokemonType;
    damage_multiplier: number;
    damage_relation: DamageRelation;
}

export type DamageRelation = 'neutral' | 'resistant' | 'twice_resistant' | 'vulnerable' | 'twice_vulnerable' | 'immune';