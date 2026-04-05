import type { GamePokemon } from '@/types/game.types';
import { useGameStore } from '@/stores/useGameStore';
import ConfigHeader from '../TeamConfig/ConfigHeader';
import { useState } from 'react';
import { TypeColoredItem } from '../ui/TypeColoredItem';
import { Crosshair, Repeat, Zap } from 'lucide-react';
import physicalMoveIcon from '@/assets/images/move_physical.png';
import specialMoveIcon from '@/assets/images/move_special.png';

interface AttacksViewProps {
	goBack: () => void;
	activePokemon: GamePokemon | null;
	trainerKey: 'A' | 'B';
}

const AttacksView = ({ goBack, activePokemon, trainerKey }: AttacksViewProps) => {
	const { registerChoice } = useGameStore();
	const [currentOverviewedMove, setCurrentOverviewedMove] = useState<GamePokemon['moves'][0] | null>(null);

	const selectAttack = (moveId: number) => {
		registerChoice(trainerKey, { type: 'ATTACK', moveId });
		setTimeout(() => {
			goBack();
		}, 200);
	};

	const overviewAttack = (move: GamePokemon['moves'][0]) => {
		console.log('Overviewing move:', move);
		if (currentOverviewedMove?.name === move.name) {
			setCurrentOverviewedMove(null);
		} else {
			setCurrentOverviewedMove(move);
		}
	};

	return (
		<div className="h-full w-full">
			<ConfigHeader title={`Attaquer`} backButtonAction={goBack} className="px-6!" />

			<div className="p-6 my-auto">
				<h2 className="text-2xl font-title font-bold text-neutral-800 text-center mb-10">
					Que doit faire {activePokemon?.name} ?
				</h2>

				<div className="grid grid-cols-1 gap-4">
					{activePokemon?.moves.map((move, index) => (
						<button
							onClick={() => selectAttack(index)}
							onMouseEnter={() => overviewAttack(move)}
							onMouseLeave={() => setCurrentOverviewedMove(null)}
							key={move.name}
							className="bg-background-100 border-background-600 py-6 border-2 active:scale-95 transition-all shadow rounded-2xl p-4 flex items-center justify-between gap-2 cursor-pointer"
						>
							<h3 className="font-title font-bold text-lg text-neutral-800 leading-tight">{move.name}</h3>
							<TypeColoredItem
								as="div"
								className="text-[10px] font-main uppercase px-2 py-0.5 bg-type rounded text-white shadow-sm flex justify-center items-center"
								pokemonType={move.type}
							>
								{move.type}
							</TypeColoredItem>
						</button>
					))}
				</div>

				{currentOverviewedMove && (
					<div className="mt-8 p-5 bg-background-100 w-full border-background-600 border-2 rounded-2xl shadow">
						{/* Header : Nom/Type/Catégorie à gauche, PP à droite */}
						<div className="flex justify-between items-start w-full mb-5">
							<div className='w-full'>
								<h3 className="font-title text-2xl font-bold text-neutral-900 leading-none">
									{currentOverviewedMove.name}
								</h3>

								{/* Conteneur Flex pour aligner le Type et la Catégorie */}
								<div className="flex items-center justify-between w-full mt-2">
									<TypeColoredItem
										as="span"
										pokemonType={currentOverviewedMove.type}
										className="inline-flex px-3 py-0.5 bg-type rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm justify-center items-center"
									>
										{currentOverviewedMove.type}
									</TypeColoredItem>

									{currentOverviewedMove.category && (
										<div className="flex items-center gap-1">
										<img
											src={
												currentOverviewedMove.category === 'physical'
													? physicalMoveIcon
													: specialMoveIcon
											}
											alt={currentOverviewedMove.category}
											className="h-5 w-auto drop-shadow-sm"
											title={`Attaque ${currentOverviewedMove.category === 'physical' ? 'Physique' : 'Spéciale'}`}
										/>
										<span className='text-right text-neutral-500'>{currentOverviewedMove.category === 'physical' ? 'Physique' : 'Spéciale'}</span>
										</div>
									)}
								</div>
							</div>

							{/* Affichage des PP en haut à droite */}
							<div className="flex min-w-15 px-2 bg-background-50 rounded-xl border-2 border-background-200 border-b-4">
								<div className="flex items-center justify-center gap-1 text-md font-main text-neutral-500 uppercase font-bold tracking-tighter whitespace-nowrap mb-0.5">
									<Repeat size={14} /> {currentOverviewedMove.powerPoints} PP
								</div>
							</div>
						</div>

						{/* Stats Grid : 2 Colonnes pour Puissance et Précision */}
						<div className="grid grid-cols-2 gap-4">
							{/* Puissance */}
							<div className="flex flex-col p-2 bg-background-50 border-background-500 rounded-xl border-2 border-b-4">
								<span className="flex items-center justify-center gap-1 text-xs font-main text-neutral-500 uppercase font-bold tracking-tighter mb-1">
									<Zap size={14} /> Puissance
								</span>
								<span className="text-xl font-title font-black text-neutral-800 text-center">
									{currentOverviewedMove.power || '—'}
								</span>
							</div>

							{/* Précision */}
							<div className="flex flex-col p-2 bg-background-50 border-background-500 rounded-xl border-2 border-b-4">
								<span className="flex items-center justify-center gap-1 text-xs font-main text-neutral-500 uppercase font-bold tracking-tighter mb-1">
									<Crosshair size={14} /> Précision
								</span>
								<span className="text-xl font-title font-black text-neutral-800 text-center">
									{currentOverviewedMove.accuracy ? `${currentOverviewedMove.accuracy}%` : '—'}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AttacksView;
