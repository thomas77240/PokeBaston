import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SelectedPokemonCard from '@/components/TeamConfig/SelectedPokemonCard';

// 1. Mocks des dépendances
vi.mock('lucide-react', () => ({
    X: () => <div data-testid="icon-x" />,
    Award: () => <div data-testid="icon-award" />,
}));


vi.mock('@/utils/pokemon.utils', () => ({
    PokemonUtils: {
        getImage: vi.fn(() => 'pokemon-image-url'),
        getPokemonColorVar: vi.fn(() => 'blue'), // Optionnel si tu en as besoin
    }
}));

// Mock du composant TypeColoredItem pour simplifier le test
vi.mock('../ui/TypeColoredItem', () => ({
    default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}));

describe('SelectedPokemonCard Component', () => {
    const mockPokemon = {
        id: 25,
        name: 'Pikachu',
        types: ['Électrik'],
    };

    const mockOpenModal = vi.fn();
    const mockRemove = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche le message d’incitation quand aucun Pokémon n’est fourni', () => {
        render(<SelectedPokemonCard />);
        expect(screen.getByText(/Ajoutez un Pokémon/i)).toBeInTheDocument();
    });

    it('affiche les informations du Pokémon quand il est présent', () => {
        render(
            <SelectedPokemonCard 
                pokemon={mockPokemon as any} 
                openPokemonModal={mockOpenModal}
            />
        );

        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/Électrik/i)).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'pokemon-image-url');
    });

    it('affiche l’icône de capitaine quand isCaptain est vrai', () => {
        render(
            <SelectedPokemonCard 
                pokemon={mockPokemon as any} 
                isCaptain={true} 
            />
        );

        expect(screen.getByTestId('icon-award')).toBeInTheDocument();
    });

    it('appelle openPokemonModal lors du clic sur la carte', () => {
        render(
            <SelectedPokemonCard 
                pokemon={mockPokemon as any} 
                openPokemonModal={mockOpenModal} 
            />
        );

        // On clique sur le conteneur principal (ici cherché par le nom du pokemon)
        fireEvent.click(screen.getByText(/Pikachu/i).closest('div')!);
        expect(mockOpenModal).toHaveBeenCalled();
    });

    it('appelle removePokemon et stoppe la propagation lors du clic sur la croix', () => {
        render(
            <SelectedPokemonCard 
                pokemon={mockPokemon as any} 
                removePokemon={mockRemove}
                openPokemonModal={mockOpenModal}
            />
        );

        const deleteButton = screen.getByRole('button');
        fireEvent.click(deleteButton);

        // Vérifie que la suppression est appelée
        expect(mockRemove).toHaveBeenCalled();
        
        // Vérifie que la modale ne s'ouvre pas (grâce au stopPropagation)
        expect(mockOpenModal).not.toHaveBeenCalled();
    });
});