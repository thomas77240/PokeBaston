export type Pokemon = {
	id: number;
	name: string;
	image: string;
	sprite: string;
	types: PokemonType[];
	stats: PokemonStats;
	resistances: PokemonResistance[];
};

export const POKEMON_TYPES = ['Normal', 'Combat', 'Vol', 'Poison', 'Sol', 'Roche', 'Insecte','Spectre','Acier','Feu', 'Eau','Plante', 'Électrik', 'Psy', 'Glace', 'Dragon', 'Ténèbres', 'Fée'];
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
	normal: number;
	combat: number;
	vol: number;
	poison: number;
	sol: number;
	roche: number;
	insecte: number;
	spectre: number;
	acier: number;
	feu: number;
	eau: number;
	plante: number;
	électrik: number;
	psy: number;
	glace: number;
	dragon: number;
	ténèbres: number;
	fée: number;
}