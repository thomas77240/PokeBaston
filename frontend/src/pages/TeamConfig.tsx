import { useEffect, useState } from 'react';
import { POKEMON_TYPES, type Pokemon } from '../types/pokemon.types';
import { useGameSetupContext } from '../hooks/useGameSetupContext';
import Button from '../components/ui/Button';
import SelectedPokemonCard from '../components/TeamConfig/SelectedPokemonCard';
import PokemonOverviewModal from '../components/TeamConfig/PokemonOverviewModal';
import { PokemonUtils } from '../utils/pokemon.utils';

interface TeamConfigProps {
	trainer: "A" | "B";
}

const TeamConfig = ({ trainer }: TeamConfigProps) => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const { addPokemon, trainers, nextStep, prevStep } = useGameSetupContext();
	const [overviewedPokemon, setOverviewedPokemon] = useState<Pokemon | null>(null);
	const trainerKey = `trainer${trainer}` as const;
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	useEffect(() => {
		const getPokemons = () => {
			fetch('/api/pokemons')
				.then((res) => res.json())
				.then(setPokemons);
		};
		getPokemons();
	}, []);

	const closeModal = () => {
		setOverviewedPokemon(null);
	};

	const openPokemonModal = (pokemon: Pokemon) => {
		setOverviewedPokemon(pokemon);
	};

	const handleTypeToggle = (type: string) => {
		setSelectedTypes((prevTypes) => {
			if (prevTypes.includes(type)) {
				return prevTypes.filter((t) => t !== type);
			}
			return [...prevTypes, type];
		});
	};

	const filteredPokemons = pokemons.filter((pokemon) => {
		if (selectedTypes.length === 0) return true;
		return pokemon.types.some((type) => selectedTypes.includes(type));
	});

	return (
		<div className="flex flex-col h-full">
			{/* Titre */}
			<div className="space-y-2 mb-4">
				<div className="flex gap-2">
					<Button className="rounded-sm" onClick={prevStep}>
						Retour
					</Button>
					<h1 className="font-title text-4xl">Configuration équipe joueur {trainer}</h1>
				</div>
				<p>Configurez votre équipe. Choisissez les Pokémons qui vous accompagneront dans ce combat.</p>
			</div>


			<div className="grid grid-cols-9 overflow-y-hidden h-full flex-1">
				{/* Colonne gauche (Liste des pokemons) */}
				<div className="col-span-7 flex overflow-hidden flex-col">
					{/* Filtres */}
					<div className="flex flex-wrap gap-4 p-2 rounded mb-2">
						{POKEMON_TYPES.map((type) => {
							const isChecked = selectedTypes.includes(type);
							return (
								<div key={type} className="flex items-center gap-1 cursor-pointer">
									<input
										type="checkbox"
										name={`type-${type}`}
										id={`type-${type}`}
										checked={isChecked}
										onChange={() => handleTypeToggle(type)}
										className="cursor-pointer"
									/>
									<label htmlFor={`type-${type}`} className="cursor-pointer select-none">
										{type}
									</label>
								</div>
							);
						})}
						{selectedTypes.length > 0 && (
							<button
								onClick={() => setSelectedTypes([])}
								className="text-sm text-blue-500 hover:underline ml-auto"
							>
								Réinitialiser les filtres
							</button>
						)}
					</div>

					{/* Pokédex */}
					<div className="grid grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 w-full overflow-y-auto p-4">
						{filteredPokemons.map((pokemon) => {
							let inTeam = false;
							if (trainers[trainerKey].team.includes(pokemon)) {
								inTeam = true;
							}
							return (
								<div
									key={pokemon.id}
									className="flex flex-col items-center p-4 w-full aspect-square"
									onClick={() => setOverviewedPokemon(pokemon)}
								>
									<img
										className={`w-full aspect-square ${inTeam && 'grayscale-100 w-full aspect-square'}`}
										src={PokemonUtils.getImage(pokemon)}
										alt={pokemon.name}
									/>
									{pokemon.name}
								</div>
							);
						})}
					</div>
				</div>

				{/* Colonne droite (Pokemons selectionnés + Bouton validation) */}
				<div className="col-span-2 flex flex-col pl-4 h-full min-h-0">
					<div className="w-full grid grid-rows-6 flex-1 min-h-0 gap-y-2 mb-4 overflow-hidden">
						{trainers[trainerKey].team.map((pokemon, index) => {
							return (
								<SelectedPokemonCard
									key={`selected-${index}`}
									pokemon={pokemon}
									openPokemonModal={() => openPokemonModal(pokemon)}
								/>
							);
						})}
						{[...new Array(6 - trainers[trainerKey].team.length)].map((_, index) => {
							return <SelectedPokemonCard key={`empty-${index}`} />;
						})}
					</div>
					<Button
						onClick={() => nextStep()}
						className="w-full shrink-0"
						disabled={trainers[trainerKey].team.length == 0}
					>
						Valider
					</Button>
				</div>
			</div>

			{overviewedPokemon && (
				<PokemonOverviewModal
					pokemon={overviewedPokemon}
					addPokemon={() => addPokemon(trainer, overviewedPokemon)}
					closeModal={() => closeModal()}
				/>
			)}
		</div>
	);
};

export default TeamConfig;
