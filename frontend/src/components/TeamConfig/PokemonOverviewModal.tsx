import { useState } from 'react';
import type { Pokemon, PokemonMove, PokemonStats } from '../../types/pokemon.types';
import { PokemonUtils } from '../../utils/pokemon.utils';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import TypeColoredItem from '../ui/TypeColoredItem';
import { Circle, CircleCheck, Eye, X, Crosshair, Zap, Repeat, Star } from 'lucide-react';
import physicalMoveIcon from '@/assets/images/move_physical.png';
import specialMoveIcon from '@/assets/images/move_special.png';
import { AnimatePresence, motion } from 'framer-motion';
import type { Trainer } from '@/types/gameSetup.types';

interface PokemonOverviewModalProps {
	pokemon: Pokemon;
	closeModal: () => void;
	addPokemon: (moves: PokemonMove[]) => void;
	availableMoves: PokemonMove[];
	trainer: Trainer;
}

const PokemonOverviewModal = ({
	pokemon,
	closeModal,
	addPokemon,
	availableMoves,
	trainer,
}: PokemonOverviewModalProps) => {
	const [selectedMoves, setSelectedMoves] = useState<PokemonMove[]>(() => {
		const existingMember = trainer.team.find((member) => member.pokemon.id === pokemon.id);
		return existingMember?.moves || [];
	});
	const [moveDetails, setMoveDetails] = useState<PokemonMove | null>(null);
	const [showButtons, setShowButtons] = useState<boolean>(false);
	const getMaxStat = (stat: keyof PokemonStats) => (stat === 'HP' ? 250 : 180);
	const [type1, type2] = pokemon.types;
	const color1 = PokemonUtils.getPokemonColorVar(type1);
	const color2 = PokemonUtils.getPokemonColorVar(type2 || type1);

	const isAlreadyInTeam = trainer.team.some((member) => member.pokemon.id === pokemon.id);
	const isTeamFull = trainer.team.length === 6;
	const hasValidMoves = selectedMoves.length === 4;

	const add = () => {
		addPokemon(selectedMoves);
		closeModal();
	};

	const toggleMove = (move: PokemonMove) => {
		setSelectedMoves((prev) => {
			const isSelected = prev.some((m) => m.name === move.name);
			if (isSelected) return prev.filter((m) => m.name !== move.name);
			if (prev.length >= 4) return prev;
			return [...prev, move];
		});

		if (selectedMoves.length === 4) setShowButtons(true);
	};

	return (
		<Modal isOpen={!!pokemon} onClose={closeModal} className="max-w-4xl flex flex-col p-0 overflow-hidden">
			{/* HEADER */}
			<header className="relative flex items-center justify-between p-6 border-b bg-background-100 border-background-600">
				<div className="flex items-center gap-4">
					<h2 className="text-3xl font-bold capitalize font-title text-neutral-900">{pokemon.name}</h2>
					<span className="text-lg font-medium text-neutral-400">#{String(pokemon.id).padStart(3, '0')}</span>
				</div>
				<button
					onClick={closeModal}
					className="p-2 transition-colors rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-background-300"
				>
					<X size={24} strokeWidth={2} />
				</button>
			</header>

			{/* CONTENU (Hauteur fixe pour gérer le scroll interne) */}
			<div className="grid h-150 grid-cols-2 divide-x divide-background-600">
				{/* COLONNE GAUCHE : Visuel & Stats */}
				<div className="flex flex-col px-6 overflow-y-auto bg-background-50">
					{/* Image avec fond dégradé dynamique */}
					<div className="relative flex items-center justify-center mb-6 h-72 shrink-0">
						<div
							className="absolute inset-0 z-10 w-full h-full rounded-full [-webkit-mask-image:radial-gradient(circle,black_1%,transparent_60%)] mask-[radial-gradient(circle,black_1%,transparent_60%)] opacity-60"
							style={{
								backgroundImage: `linear-gradient(45deg, ${color1} 40%, ${color2} 60%)`,
							}}
						></div>
						<img
							className="relative z-20 object-contain w-full h-full p-6 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
							src={PokemonUtils.getImage(pokemon)}
							alt={pokemon.name}
						/>
					</div>

					{/* Types */}
					<div className="flex justify-center gap-3 mb-8 shrink-0">
						{pokemon.types.map((type) => (
							<TypeColoredItem
								as="span"
								pokemonType={type}
								key={`filter-${type}`}
								className="px-5 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase border border-transparent shadow-sm select-none bg-type text-white"
							>
								{type}
							</TypeColoredItem>
						))}
					</div>

					{/* Statistiques */}
					<div className="flex flex-col gap-3">
						{(Object.entries(pokemon.stats) as [keyof PokemonStats, number][]).map(([name, value]) => {
							const fillPercentage = (value / getMaxStat(name)) * 100;
							return (
								<div key={name + '_stat'} className="flex items-center gap-4">
									<span className="w-8 text-xs font-bold tracking-wider text-right uppercase text-neutral-500">
										{name}
									</span>
									<div className="flex-1 h-2.5 overflow-hidden rounded-full bg-background-400 border border-background-600/90">
										<div
											className="h-full transition-all duration-1000 ease-out rounded-full border"
											style={{
												width: `${fillPercentage}%`,
												backgroundColor: color1,
												borderColor: color1,
											}}
										></div>
									</div>
									<span className="w-8 text-sm font-semibold text-neutral-700">{value}</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* COLONNE DROITE : Attaques */}
				<div className="flex flex-col h-full overflow-hidden bg-background-300">
					{/* En-tête des attaques */}
					<div className="flex items-center justify-between p-6 pb-2 shrink-0">
						<h3 className="text-sm font-bold tracking-wider uppercase text-neutral-500">
							Attaques Disponibles
						</h3>
						<span
							className={`px-3 py-1 text-sm font-bold rounded-full ${
								selectedMoves.length === 4
									? 'bg-green-100 text-green-700'
									: 'bg-background-300 text-neutral-600'
							}`}
						>
							{selectedMoves.length} / 4
						</span>
					</div>

					{/* Liste scrollable des attaques */}
					<div className="flex flex-col flex-1 gap-3 p-6 pt-2 overflow-y-auto min-h-0">
						{availableMoves.map((move) => {
							const isSelected = selectedMoves.some((m) => m.name === move.name);
							const isMaxReached = selectedMoves.length >= 4 && !isSelected;

							return (
								<div
									key={move.id + '_moveSelector'}
									className={`group flex items-center justify-between w-full rounded-2xl p-4 gap-4 transition-all duration-300 shrink-0  ${
										isSelected
											? 'border-neutral-900 border bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] scale-[1.02] z-10 relative'
											: 'border-background-600/75 border bg-white/70 hover:bg-white hover:border-background-600 shadow-sm hover:shadow-md'
									}`}
								>
									{/* ZONE GAUCHE : Bouton Select + Infos */}
									<div className="flex items-center flex-1 gap-4">
										{/* Bouton Check */}
										<button
											onClick={() => toggleMove(move)}
											disabled={!isSelected && isMaxReached}
											className={`flex items-center justify-center cursor-pointer shrink-0 h-10 w-10 rounded-full transition-colors duration-200 ${
												isSelected
													? 'text-neutral-900'
													: isMaxReached
														? 'text-neutral-300 cursor-not-allowed opacity-50'
														: 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
											}`}
										>
											{isSelected ? (
												<CircleCheck
													size={32}
													strokeWidth={2}
													className="fill-neutral-900 text-white"
												/>
											) : (
												<Circle size={32} strokeWidth={1.5} />
											)}
										</button>

										{/* Textes et Badges */}
										<div className="flex flex-col gap-1.5">
											<div className="flex items-center gap-2">
												<span
													className={`text-lg capitalize transition-all duration-200 ${
														isSelected
															? 'font-black text-neutral-900'
															: 'font-bold text-neutral-700'
													}`}
												>
													{move.name}
												</span>
												<TypeColoredItem
													as="span"
													pokemonType={move.type}
													className="px-2 py-0.5 text-[10px] flex items-center gap-1 font-extrabold tracking-wider uppercase bg-type/10 text-type rounded-md border border-type/20"
												>
													{move.type}
													{pokemon.types.includes(move.type) && (
														<Star fill="currentColor" strokeWidth={1} size={10} />
													)}
												</TypeColoredItem>
											</div>

											{/* NOUVEAU : Mini-stats intégrées */}
											<div className="flex items-center gap-4 text-xs font-semibold text-neutral-500">
												<span className="flex items-center gap-1.5">
													<img
														src={
															move.category === 'physical'
																? physicalMoveIcon
																: specialMoveIcon
														}
														alt={move.category}
														className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
													/>
													<span className="capitalize">
														{move.category === 'physical'
															? 'Physique'
															: move.category === 'special'
																? 'Spécial'
																: 'Statut'}
													</span>
												</span>
												{move.power && (
													<span className="flex items-center gap-1">
														<Zap
															size={14}
															className={
																isSelected ? 'text-yellow-500' : 'text-neutral-400'
															}
														/>
														{move.power}
													</span>
												)}
												{move.accuracy && (
													<span className="flex items-center gap-1">
														<Crosshair
															size={14}
															className={
																isSelected ? 'text-blue-500' : 'text-neutral-400'
															}
														/>
														{move.accuracy}%
													</span>
												)}
											</div>
										</div>
									</div>

									{/* ZONE DROITE : Bouton Détails */}
									<button
										onClick={() => setMoveDetails(moveDetails === move ? null : move)}
										className={`flex items-center justify-center cursor-pointer shrink-0 h-10 w-10 rounded-full transition-all duration-200 ${
											moveDetails === move
												? 'bg-neutral-800 text-white opacity-100'
												: 'text-neutral-400 hover:bg-neutral-200 hover:text-neutral-800 opacity-0 group-hover:opacity-100 focus:opacity-100'
										}`}
									>
										{moveDetails === move ? (
											<X size={20} strokeWidth={2.5} />
										) : (
											<Eye size={20} strokeWidth={2.5} />
										)}
									</button>
								</div>
							);
						})}
					</div>

					{/* PANNEAU DE DÉTAILS D'ATTAQUE (Apparaît par le bas) */}
					<div
						className={`bg-white border-t border-background-300 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
							moveDetails ? 'h-53 opacity-100' : 'h-0 opacity-0'
						}`}
					>
						{moveDetails && (
							<div className="flex flex-col h-full p-6">
								<div className="flex items-center justify-between mb-4">
									<h4 className="text-xl font-bold capitalize text-neutral-900 font-title">
										{moveDetails.name}
									</h4>
									<div className="flex gap-4">
										<TypeColoredItem
											as="span"
											pokemonType={moveDetails.type}
											className="text-sm font-bold uppercase text-type"
										>
											{moveDetails.type}
										</TypeColoredItem>
										<img
											src={
												moveDetails.category === 'physical' ? physicalMoveIcon : specialMoveIcon
											}
											alt={moveDetails.category}
										/>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div className="flex flex-col p-3 rounded-lg bg-background-50 border border-background-300">
										<span className="flex items-center gap-1 text-xs font-bold text-neutral-500 uppercase mb-1">
											<Zap size={14} /> Puissance
										</span>
										<span className="text-lg font-semibold text-neutral-800">
											{moveDetails.power || '-'}
										</span>
									</div>
									<div className="flex flex-col p-3 rounded-lg bg-background-50 border border-background-300">
										<span className="flex items-center gap-1 text-xs font-bold text-neutral-500 uppercase mb-1">
											<Crosshair size={14} /> Précision
										</span>
										<span className="text-lg font-semibold text-neutral-800">
											{moveDetails.accuracy ? `${moveDetails.accuracy}%` : '-'}
										</span>
									</div>
									<div className="flex flex-col p-3 rounded-lg bg-background-50 border border-background-300">
										<span className="flex items-center gap-1 text-xs font-bold text-neutral-500 uppercase mb-1">
											<Repeat size={14} /> PP
										</span>
										<span className="text-lg font-semibold text-neutral-800">{moveDetails.PP}</span>
									</div>
								</div>
								<div className="flex gap-2">
									<Button onClick={() => setMoveDetails(null)} className="grow" variant="outline">
										Fermer
									</Button>
									<Button
										onClick={() => {
											toggleMove(moveDetails);
											setMoveDetails(null);
										}}
										className="grow"
									>
										{selectedMoves.includes(moveDetails) ? 'Retirer' : 'Ajouter'}
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* FOOTER ACTIONS avec Framer Motion */}
			<AnimatePresence>
				{(showButtons || selectedMoves.length === 4) && (
					<motion.div
						key={`pokemon-${pokemon.id}-overview-modal-footer`}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="flex items-center justify-end gap-4 p-6 border-t bg-white border-background-600 shrink-0"
					>
						<Button variant="outline" onClick={closeModal} className="px-6 py-2.5">
							Annuler
						</Button>

						{
							<Button
								onClick={add}
								disabled={!hasValidMoves || (!isAlreadyInTeam && isTeamFull)}
								className={`px-8 py-2.5 font-bold transition-transform hover:-translate-y-0.5`}
							>
								{isAlreadyInTeam
									? 'Enregistrer'
									: isTeamFull
										? 'Equipe pleine'
										: "Ajouter à l'équipe"}
							</Button>
						}
					</motion.div>
				)}
			</AnimatePresence>
		</Modal>
	);
};

export default PokemonOverviewModal;
