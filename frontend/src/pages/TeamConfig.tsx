import { useEffect, useState } from 'react';
import { POKEMON_TYPES, type Pokemon, type PokemonMove } from '../types/pokemon.types';
import { useGameSetupContext } from '../hooks/useGameSetupContext';
import Button from '../components/ui/Button';
import SelectedPokemonCard from '../components/TeamConfig/SelectedPokemonCard';
import PokemonOverviewModal from '../components/TeamConfig/PokemonOverviewModal';
import { PokemonUtils } from '../utils/pokemon.utils';
import ConfigHeader from '../components/TeamConfig/ConfigHeader';
import { CircleCheck, Loader, PackageOpen, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import TypeColoredItem from '../components/ui/TypeColoredItem';

interface TeamConfigProps {
	trainer: 'A' | 'B';
}

const TeamConfig = ({ trainer }: TeamConfigProps) => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [moves, setMoves] = useState<PokemonMove[]>([]);
	const { addPokemon, trainers, nextStep, prevStep, removePokemon } = useGameSetupContext();
	const [overviewedPokemon, setOverviewedPokemon] = useState<Pokemon | null>(null);
	const trainerKey = `trainer${trainer}` as const;
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showFilters, setShowFilters] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const fetchGameData = async () => {
			setIsLoading(true);

			try {
				const [pokemonsRes, movesRes] = await Promise.all([fetch('/api/pokemons'), fetch('/api/moves')]);
				const pokemonsData = await pokemonsRes.json();
				const movesData = await movesRes.json();

				setPokemons(
					pokemonsData.map((pokemon : Pokemon) => { // Temporaire car l'API n'envoie pas les moves --------------
						return { ...pokemon, moves: [1, 2, 3, 4,17,29,92,109,12,73] };
					}),
				);
				setMoves(movesData);
			} catch (error) {
				console.error('Erreur lors du chargement des données :', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGameData();
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

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		setIsScrolled(e.currentTarget.scrollTop > 10);
	};

	const filteredPokemons = pokemons.filter((pokemon) => {
		const matchesType = selectedTypes.length === 0 || pokemon.types.some((type) => selectedTypes.includes(type));
		const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesType && matchesSearch;
	});

	return (
		<div className="flex flex-col h-full">
			<div className="grid grid-cols-9 grid-rows-[auto_1fr] overflow-y-auto h-full flex-1">
				<ConfigHeader
					className="col-span-7"
					title={`Equipe de ${trainers[trainerKey].name}`}
					backButtonAction={prevStep}
				/>

				{/* Colonne droite (Pokemons selectionnés + Bouton validation) */}
				<div className="col-span-2 row-span-2 border-l border-background-600 flex flex-col h-full min-h-0">
					<div className="p-8 border-b bg-background-50 border-background-600">
						<h2 className="text-lg font-semibold uppercase">Composition</h2>
						<p className="uppercase tracking-wide">{trainers[trainerKey].team.length} / 6 sélectionnés</p>
					</div>
					<div className="w-full bg-background-100 p-6 grid grid-rows-6 flex-1 min-h-0 gap-y-4 overflow-hidden">
						<AnimatePresence mode="popLayout">
							{trainers[trainerKey].team.map((member, index) => {
								const pokemon = member.pokemon;
								return (
									<motion.div
										key={`selected-${pokemon.id}`}
										layout
										initial={{ opacity: 0, x: -50, scale: 0.9 }}
										animate={{ opacity: 1, x: 0, scale: 1 }}
										exit={{ opacity: 0, x: 50, scale: 0.5 }}
										transition={{ type: 'spring', stiffness: 300, damping: 25 }}
										className="h-full"
										style={{ gridRow: index + 1 }}
									>
										<SelectedPokemonCard
											pokemon={pokemon}
											isCaptain={index === 0}
											removePokemon={() => removePokemon(trainer, pokemon)}
											openPokemonModal={() => openPokemonModal(pokemon)}
										/>
									</motion.div>
								);
							})}
							{[...new Array(6 - trainers[trainerKey].team.length)].map((_, index) => {
								const teamLength = trainers[trainerKey].team.length;
								return (
									<motion.div
										layout
										key={`empty-${index}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="h-full"
										style={{ gridRow: teamLength + index + 1 }}
									>
										<SelectedPokemonCard />
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
					<div className="border-t border-background-600 p-6">
						<Button
							onClick={nextStep}
							className="text-xl font-medium tracking-wide py-4 w-full transition-all duration-300 not-disabled:shadow-lg not-disabled:hover:shadow-xl translate-x-0 not-disabled:hover:-translate-y-1"
							disabled={trainers[trainerKey].team.length == 0}
						>
							Valider
						</Button>
					</div>
				</div>

				{/* Colonne gauche (Liste des pokemons) */}
				<div className="col-span-7 flex overflow-hidden flex-col max-w-7xl mx-auto px-8 w-full">
					{/* Recherche + Bouton Filtres */}
					<div className="flex items-center gap-4 mt-4 mb-4 w-full">
						<div className="relative flex-1 w-full">
							<input
								type="text"
								placeholder="Rechercher un Pokémon..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-4 pr-10 py-3 placeholder:text-neutral-400 transition-all bg-background-50 focus:bg-background-400 text-lg px-4 rounded-xl border-background-600 border shadow-sm"
							/>
							<Search size={24} className="absolute right-1 top-1/2 -translate-1/2 text-neutral-400" />
						</div>

						{/* Bouton pour afficher les filtres */}
						<button
							type="button"
							onClick={() => setShowFilters(!showFilters)}
							className={`px-4 py-3 rounded-xl h-full border font-medium border-background-600 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-lg
								${
									showFilters || selectedTypes.length > 0
										? 'bg-neutral-950 text-white border-neutral-950'
										: 'bg-background-50 text-neutral-700 border-background-300 hover:bg-background-100'
								}`}
						>
							<span>Filtres</span>
							{selectedTypes.length > 0 && (
								<span className="bg-white text-neutral-950 text-xs py-0.5 px-2 rounded-full">
									{selectedTypes.length}
								</span>
							)}
						</button>
					</div>

					{/* Panneau de filtres */}
					<AnimatePresence>
						{showFilters && (
							<motion.div
								initial={{ height: 0, opacity: 0, marginBottom: 0 }}
								animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
								exit={{ height: 0, opacity: 0, marginBottom: 0 }}
								transition={{ duration: 0.2, ease: 'easeInOut' }}
								className="overflow-hidden"
							>
								<div className="bg-background-50 border rounded-xl p-4 border-background-600 shrink-0 shadow-sm">
									<div className="flex justify-between items-center mb-3">
										<h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">
											Filtrer par type
										</h3>
										{selectedTypes.length > 0 && (
											<button
												type="button"
												onClick={() => setSelectedTypes([])}
												className="text-xs text-neutral-500 hover:text-neutral-950 hover:underline transition-colors cursor-pointer"
											>
												Réinitialiser
											</button>
										)}
									</div>

									<div className="flex flex-wrap gap-2">
										{POKEMON_TYPES.map((type) => {
											const isChecked = selectedTypes.includes(type);

											return (
												<TypeColoredItem
													as='button'
													pokemonType={type}
													key={type}
													onClick={() => handleTypeToggle(type)}
													className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer select-none
                                    				${isChecked ? `bg-type border-transparent text-white shadow-sm` : `bg-type/10 text-type`}`}
												>
													{type}
												</TypeColoredItem>
											);
										})}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Pokédex */}
					{isLoading ? (
						<div className="flex gap-2 text-2xl my-auto items-center justify-center text-center">
							<Loader strokeWidth={1.5} size={32} className="animate-spin" /> Chargement en cours...
						</div>
					) : filteredPokemons.length ? (
						<div className="relative flex-1 w-full h-full min-h-0 mt-2">
							<div
								className={`absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-background-300 to-transparent pointer-events-none z-10 transition-opacity duration-300
        						${isScrolled ? 'opacity-100' : 'opacity-0'}`}
							></div>
							<div
								className="grid content-start grid-cols-5 gap-6 w-full h-full overflow-y-auto pb-16 no-scrollbar"
								onScroll={handleScroll}
							>
								<AnimatePresence mode="popLayout">
									{filteredPokemons.map((pokemon) => {
										let inTeam = false;
										if (
											trainers[trainerKey].team.some((member) => member.pokemon.id === pokemon.id)
										) {
											inTeam = true;
										}
										return (
											<motion.div
												key={pokemon.id}
												layout
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.2 }}
												className="h-full"
											>
												<div
													className={`group relative bg-background-50 border text-muted border-background-600 shadow-sm transition-all hover:shadow-md rounded-xl flex flex-col justify-center items-center p-4 w-full aspect-square ${inTeam && 'border-3 border-black bg-background-50 text-neutral-950 font-medium'}`}
													onClick={() => setOverviewedPokemon(pokemon)}
												>
													{inTeam && (
														<CircleCheck
															size={32}
															color="white"
															fill="black"
															className="absolute right-2 top-2"
														/>
													)}
													<img
														className={`w-2/3 aspect-square group-hover:scale-110 mb-2 transition-transform`}
														src={PokemonUtils.getImage(pokemon)}
														alt={pokemon.name}
													/>
													{pokemon.name}
												</div>
											</motion.div>
										);
									})}
								</AnimatePresence>
							</div>
							<div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background-300 to-transparent pointer-events-none z-10"></div>
						</div>
					) : (
						<div className="flex gap-2 text-2xl my-auto items-center justify-center text-center">
							<PackageOpen strokeWidth={1.5} size={32} /> Aucun Pokemon trouvé !
						</div>
					)}
				</div>
			</div>

			{overviewedPokemon && (
				<PokemonOverviewModal
					pokemon={overviewedPokemon}
					addPokemon={(moves) => addPokemon(trainer, overviewedPokemon, moves)}
					closeModal={() => closeModal()}
					availableMoves={moves.filter((move) => overviewedPokemon.moves.includes(move.id))}

					trainer={trainers[trainerKey]}
				/>
			)}
		</div>
	);
};

export default TeamConfig;
