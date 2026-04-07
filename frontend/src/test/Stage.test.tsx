/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Stage from '@/components/Game/Stage';
import { useGameStore } from '@/stores/useGameStore';

// 1. Mock de Framer Motion (Évite les crashs useContext)
vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ initial, animate, exit, transition, variants, ...props }: any, ref: any) => 
            React.createElement('div', { ...props, ref })
        ),
        img: React.forwardRef(({ initial, animate, exit, transition, variants, ...props }: any, ref: any) => 
            React.createElement('img', { ...props, ref })
        ),
    },
    AnimatePresence: ({ children }: any) => children,
}));

// 2. Mocks du store Zustand
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

// 3. Mock des utilitaires Pokémon
vi.mock('@/utils/pokemon.utils', () => ({
    PokemonUtils: {
        getSprite: vi.fn(() => 'front-sprite.png'),
        getBackSprite: vi.fn(() => 'back-sprite.png'),
    }
}));

// 4. Mocks des composants enfants (CHEMINS ABSOLUS pour être sûr à 100% qu'ils soient trouvés)
vi.mock('@/components/Game/ActivePokemonStatusCard', () => ({
    default: ({ pokemon }: any) => React.createElement('div', { 'data-testid': 'status-card' }, pokemon?.name)
}));

vi.mock('@/components/ui/TypewriterText', () => ({
    default: ({ text }: any) => React.createElement('span', { 'data-testid': 'typewriter' }, text)
}));

// 5. Mock de l'image
vi.mock('@/assets/images/stages/stage_1.png', () => ({
    default: 'mocked-stage-bg.png',
}));

describe('Stage Component', () => {
    // Données blindées avec 'hp' et 'baseStats' pour éviter "Cannot read properties of undefined (reading 'HP')"
    const mockTrainerA = {
        activePokemon: 0,
        team: [{ 
            name: 'Reptincel', 
            id: 5,
            hp: 100,
            baseStats: { HP: 100, ATK: 50, DEF: 50, SPA: 50, SPD: 50, SPE: 50 } 
        }]
    };
    
    const mockTrainerB = {
        activePokemon: 0,
        team: [{ 
            name: 'Tortank', 
            id: 9,
            hp: 150,
            baseStats: { HP: 150, ATK: 80, DEF: 100, SPA: 80, SPD: 100, SPE: 70 } 
        }]
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche les deux Pokémon et leurs cartes de statut', () => {
        (useGameStore as any).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: mockTrainerB,
            phase: 'IDLE',
            currentLog: ''
        });

        render(<Stage />);

        expect(screen.getByAltText('Reptincel')).toBeInTheDocument();
        expect(screen.getByAltText('Tortank')).toBeInTheDocument();

        const statusCards = screen.getAllByTestId('status-card');
        expect(statusCards).toHaveLength(2);
        expect(screen.getByText('Reptincel')).toBeInTheDocument();
        expect(screen.getByText('Tortank')).toBeInTheDocument();
    });

    it('cache la zone de logs quand la phase n\'est pas ANIMATING_RESULTS', () => {
        (useGameStore as any).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: mockTrainerB,
            phase: 'IDLE',
            currentLog: 'Un texte de test'
        });

        render(<Stage />);
        
        const typeWriter = screen.getByTestId('typewriter');
        const logBox = typeWriter.parentElement?.parentElement; 
        
        expect(logBox).toBeInTheDocument();
        expect(logBox).toHaveClass('opacity-0');
        expect(logBox).toHaveClass('pointer-events-none');
    });

    it('affiche la zone de logs et l\'indicateur quand la phase est ANIMATING_RESULTS', () => {
        (useGameStore as any).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: mockTrainerB,
            phase: 'ANIMATING_RESULTS',
            currentLog: 'Reptincel utilise Lance-Flammes !'
        });

        render(<Stage />);

        const typeWriter = screen.getByTestId('typewriter');
        expect(typeWriter).toHaveTextContent('Reptincel utilise Lance-Flammes !');
        
        const logBox = typeWriter.parentElement?.parentElement;
        expect(logBox).toHaveClass('opacity-100');
        expect(logBox).toHaveClass('translate-y-0');
    });

    it('gère l\'absence d\'un dresseur sans planter', () => {
        (useGameStore as any).mockReturnValue({
            trainerA: mockTrainerA,
            trainerB: null, 
            phase: 'IDLE',
            currentLog: ''
        });

        render(<Stage />);

        expect(screen.getByAltText('Reptincel')).toBeInTheDocument();
        expect(screen.queryByAltText('Tortank')).not.toBeInTheDocument();
        
        const statusCards = screen.getAllByTestId('status-card');
        expect(statusCards).toHaveLength(1);
    });
});