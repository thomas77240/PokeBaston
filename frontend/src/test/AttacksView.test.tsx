import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import AttacksView from '@/components/Game/AttacksView'; 
import { useGameStore } from '@/stores/useGameStore';
import type { GamePokemon } from '@/types/game.types';

// 1. Mock du store Zustand
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

vi.mock('lucide-react', () => ({
    Crosshair: () => <div data-testid="icon-crosshair" />,
    Repeat: () => <div data-testid="icon-repeat" />,
    Zap: () => <div data-testid="icon-zap" />,
    ChevronLeft: () => <div data-testid="icon-chevron-left" />, 
}));

vi.mock('../TeamConfig/ConfigHeader', () => ({
    default: () => <div data-testid="mock-header" /> 
}));

vi.mock('../ui/TypeColoredItem', () => ({
    TypeColoredItem: ({ children }: any) => <span>{children}</span>
}));

vi.mock('@/assets/images/move_physical.png', () => ({ default: 'physical-icon.png' }));
vi.mock('@/assets/images/move_special.png', () => ({ default: 'special-icon.png' }));

describe('AttacksView', () => {
    const mockRegisterChoice = vi.fn();
    const mockGoBack = vi.fn();

    // CORRECTION ICI : Remplacement de "PP" par "powerPoints" pour matcher le composant
    const mockPokemon = {
        name: 'Pikachu',
        moves: [
            { name: 'Charge', type: 'normal', category: 'physical', powerPoints: 35, power: 40, accuracy: 100 },
            { name: 'Tonnerre', type: 'electric', category: 'special', powerPoints: 15, power: 90, accuracy: 100 }
        ]
    } as unknown as GamePokemon;

    beforeEach(() => {
        vi.clearAllMocks();
        
        vi.mocked(useGameStore).mockReturnValue({
            registerChoice: mockRegisterChoice,
        } as any);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('affiche le nom du Pokémon et ses attaques', () => {
        render(
            <AttacksView goBack={mockGoBack} activePokemon={mockPokemon} trainerKey="A" />
        );

        expect(screen.getByText('Que doit faire Pikachu ?')).toBeInTheDocument();
        expect(screen.getByText('Charge')).toBeInTheDocument();
        expect(screen.getByText('Tonnerre')).toBeInTheDocument();
    });

    it('affiche les détails de l\'attaque au survol (hover) et les cache ensuite', () => {
        render(
            <AttacksView goBack={mockGoBack} activePokemon={mockPokemon} trainerKey="A" />
        );

        const chargeButton = screen.getByText('Charge').closest('button');
        expect(chargeButton).not.toBeNull();

        fireEvent.mouseEnter(chargeButton!);

        // CORRECTION ICI : Utilisation de /35 PP/ car le composant rajoute le texte " PP"
        expect(screen.getByText(/35 PP/)).toBeInTheDocument(); 
        expect(screen.getByText('40')).toBeInTheDocument(); 
        expect(screen.getByText('Physique')).toBeInTheDocument(); 

        fireEvent.mouseLeave(chargeButton!);

        expect(screen.queryByText('Physique')).not.toBeInTheDocument();
    });

    it('enregistre le choix et revient en arrière avec un délai lors du clic', () => {
        vi.useFakeTimers(); 

        render(
            <AttacksView goBack={mockGoBack} activePokemon={mockPokemon} trainerKey="A" />
        );

        const tonnerreButton = screen.getByText('Tonnerre').closest('button');
        
        fireEvent.click(tonnerreButton!);

        expect(mockRegisterChoice).toHaveBeenCalledTimes(1);
        expect(mockRegisterChoice).toHaveBeenCalledWith('A', { type: 'ATTACK', moveId: 1 });

        expect(mockGoBack).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('ne plante pas si aucun Pokémon n\'est actif', () => {
        const { container } = render(
            <AttacksView goBack={mockGoBack} activePokemon={null} trainerKey="A" />
        );
        
        expect(container).toBeInTheDocument();
        expect(screen.queryByText(/Que doit faire/i)).toBeInTheDocument();
    });
});