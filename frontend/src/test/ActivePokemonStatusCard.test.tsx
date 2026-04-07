import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ActivePokemonStatusCard from '../components/Game/ActivePokemonStatusCard';
import { useGameStore } from '@/stores/useGameStore'; 
import type { GamePokemon } from '@/types/game.types';

// 1. Mock global de Zustand
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

// 2. Mock du sous-composant TypeColoredItem pour isoler le test
vi.mock('../ui/TypeColoredItem', () => ({
    TypeColoredItem: ({ children }: any) => <div data-testid="type-colored-item">{children}</div>,
}));

describe('ActivePokemonStatusCard', () => {
    // Création d'un mock robuste
    const mockPokemon = {
        id: 1,
        name: 'Pikachu',
        hp: 100,
        baseStats: {
            HP: 200
        },
        type: ['electric'],
    } as unknown as GamePokemon;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche correctement le nom et le niveau', () => {
        // On force le type avec 'as any' pour éviter les erreurs TypeScript
        (useGameStore as any).mockReturnValue({ 
            gameLevel: 50, 
            phase: 'IDLE' 
        });

        render(<ActivePokemonStatusCard pokemon={mockPokemon} />);
        
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/Lvl 50/i)).toBeInTheDocument();
    });

    it('affiche la barre en rouge quand les PV sont < 20%', () => {
        // CORRECTION : gameLevel au lieu de level
        (useGameStore as any).mockReturnValue({ 
            gameLevel: 50, 
            phase: 'IDLE' 
        });

        // Les baseStats.HP sont déjà à 200 grâce au spread object, on a juste à changer hp
        const criticalPokemon = { ...mockPokemon, hp: 20 } as unknown as GamePokemon;
        const { container } = render(<ActivePokemonStatusCard pokemon={criticalPokemon} />);
        
        // Sélectionne la div interne de la barre de vie
        const healthBar = container.querySelector('.h-full');
        expect(healthBar).toHaveClass('bg-red-500');
        expect(healthBar).toHaveClass('animate-pulse');
    });

    it('applique la classe de scale quand la phase est ANIMATING_RESULTS', () => {
        // Changement dynamique de la phase pour ce test précis
        (useGameStore as any).mockReturnValue({ 
            gameLevel: 50, 
            phase: 'ANIMATING_RESULTS' 
        });

        const { container } = render(<ActivePokemonStatusCard pokemon={mockPokemon} />);
        
        // On vérifie que la div principale a bien la classe scale-100
        expect(container.firstChild).toHaveClass('scale-100');
    });
});