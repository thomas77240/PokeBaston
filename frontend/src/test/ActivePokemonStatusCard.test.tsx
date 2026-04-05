import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActivePokemonStatusCard from '../components/Game/ActivePokemonStatusCard.tsx';
import { useGameStore } from '@/stores/useGameStore'; 
import type { GamePokemon } from '@/types/game.types';

// 1. On prépare le mock global de Zustand
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

describe('ActivePokemonStatusCard', () => {
    // 2. Création d'un mock robuste avec le "double cast" pour éviter les erreurs de stats manquantes
    const mockPokemon = {
        id: 1,
        name: 'Pikachu',
        HP: 100,
        maxHP: 200,
        type: ['electric'],
    } as unknown as GamePokemon;

    it('affiche correctement le nom et le niveau', () => {
        // On définit la valeur de retour du store pour ce test
        vi.mocked(useGameStore).mockReturnValue({ 
            level: 50, 
            phase: 'IDLE' 
        });

        render(<ActivePokemonStatusCard pokemon={mockPokemon} />);
        
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/Lvl 50/i)).toBeInTheDocument();
    });

    it('affiche la barre en rouge quand les PV sont < 20%', () => {
        vi.mocked(useGameStore).mockReturnValue({ level: 50, phase: 'IDLE' });

        const criticalPokemon = { ...mockPokemon, HP: 20, maxHP: 200 } as unknown as GamePokemon;
        const { container } = render(<ActivePokemonStatusCard pokemon={criticalPokemon} />);
        
        // Sélectionne la div interne de la barre de vie
        const healthBar = container.querySelector('.h-full');
        expect(healthBar).toHaveClass('bg-red-500');
        expect(healthBar).toHaveClass('animate-pulse');
    });

    it('applique la classe de scale quand la phase est ANIMATING_RESULTS', () => {
        // Changement dynamique de la phase pour ce test précis
        vi.mocked(useGameStore).mockReturnValue({ 
            level: 50, 
            phase: 'ANIMATING_RESULTS' 
        });

        const { container } = render(<ActivePokemonStatusCard pokemon={mockPokemon} />);
        
        // On vérifie que la div principale a bien la classe scale-100
        expect(container.firstChild).toHaveClass('scale-100');
    });
});