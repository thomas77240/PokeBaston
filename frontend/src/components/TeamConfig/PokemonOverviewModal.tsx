import type { Pokemon } from '../../types/pokemon.types';
import { PokemonUtils } from '../../utils/pokemon.utils';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface PokemonOverviewModalProps {
	pokemon: Pokemon;
	closeModal: () => void;
	addPokemon: () => void;
}

const PokemonOverviewModal = ({ pokemon, closeModal, addPokemon }: PokemonOverviewModalProps) => {
	const add = () => {
		addPokemon();
		closeModal();
	};

	return (
		<Modal isOpen={!!pokemon} onClose={() => closeModal()}>
			<img className="h-25 aspect-auto" src={PokemonUtils.getSprite(pokemon)} alt="" />
			<img className="h-25 aspect-auto" src={PokemonUtils.getBackSprite(pokemon)} alt="" />
			<h2>{pokemon?.name}</h2>
			<Button onClick={add}>Ajouter</Button>
		</Modal>
	);
};

export default PokemonOverviewModal;
