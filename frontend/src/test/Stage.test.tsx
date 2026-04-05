import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Stage from '@/components/Game/Stage';
import { useGameStore } from '@/stores/useGameStore';

// 1. Mocks des dépendances
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

// Mock du composant enfant pour isoler le test de Stage
vi.mock('../components/Game/ActivePokemonStatusCard', () => ({
    // On doit exporter "default" car c'est un export par défaut
    default: ({ pokemon }: any) => (
        <div data-testid="status-card">
            {pokemon?.name}
        </div>
    ),
}));

// Mock de l'image de fond
vi.mock('@/assets/images/stages/stage_1.png', () => ({
    default: 'mocked-stage-bg.png',
}));

describe('Stage Component', () => {
    // Données de test réutilisables
    const mockTrainerA = {
        activePokemon: 0,
        team: [{ name: 'Reptincel', id: 5 }]
    };
    const mockTrainerB = {
        activePokemon: 0,
        team: [{ name: 'Tortank', id: 9 }]
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche les deux Pokémon et leurs cartes de statut', () => {
        vi.mocked(useGameStore).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: mockTrainerB,
            phase: 'IDLE'
        });

        render(<Stage />);

        // Vérifie la présence des Pokémon par leur attribut Alt
        expect(screen.getByAltText('Reptincel')).toBeInTheDocument();
        expect(screen.getByAltText('Tortank')).toBeInTheDocument();

        // Vérifie que les deux cartes de statut (moguées) sont là
        const statusCards = screen.getAllByTestId('status-card');
        expect(statusCards).toHaveLength(2);
        expect(screen.getByText('Reptincel')).toBeInTheDocument();
        expect(screen.getByText('Tortank')).toBeInTheDocument();
    });

    it('cache la zone de logs quand la phase n\'est pas ANIMATING_RESULTS', () => {
        vi.mocked(useGameStore).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: mockTrainerB,
            phase: 'IDLE'
        });

        const { container } = render(<Stage />);
        
        // On cherche la div qui contient le texte du log
        // Note : Elle est toujours dans le DOM mais avec opacity-0
        const logBox = container.querySelector('.opacity-0');
        expect(logBox).toBeInTheDocument();
        expect(logBox).toHaveClass('pointer-events-none');
    });

    it('affiche la zone de logs et l\'indicateur quand la phase est ANIMATING_RESULTS', () => {
        vi.mocked(useGameStore).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: mockTrainerB,
            phase: 'ANIMATING_RESULTS'
        });

        render(<Stage />);

        // Le texte du log doit être visible
        expect(screen.getByText(/Reptincel utilise Lance-Flammes/i)).toBeInTheDocument();
        
        // La div doit avoir les classes d'opacité 100
        const logContainer = screen.getByText(/Reptincel utilise Lance-Flammes/i).parentElement;
        expect(logContainer).toHaveClass('opacity-100');
        expect(logContainer).toHaveClass('translate-y-0');
    });

    it('gère l\'absence d\'un dresseur sans planter', () => {
        vi.mocked(useGameStore).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: null, // Cas où B n'est pas encore prêt
            phase: 'IDLE'
        });

        render(<Stage />);

        expect(screen.getByAltText('Reptincel')).toBeInTheDocument();
        expect(screen.queryByAltText('Tortank')).not.toBeInTheDocument();
        
        const statusCards = screen.getAllByTestId('status-card');
        expect(statusCards).toHaveLength(1);
    });
});