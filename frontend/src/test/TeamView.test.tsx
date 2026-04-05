import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TeamView from '@/components/Game/TeamView';
import { useGameStore } from '@/stores/useGameStore';
import type { GamePokemon } from '@/types/game.types';

// 1. Mocks des dépendances
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

vi.mock('../TeamConfig/ConfigHeader', () => ({
    default: ({ title, backButtonAction }: any) => (
        <div data-testid="mock-header">
            {title}
            <button onClick={backButtonAction}>Back</button>
        </div>
    ),
}));

describe('TeamView Component', () => {
    const mockRegisterChoice = vi.fn();
    const mockGoBack = vi.fn();

    // Mock d'une équipe de 3 Pokémon
    const mockTeam: GamePokemon[] = [
        { id: 1, name: 'Pikachu', HP: 100, maxHP: 100, type: ['electric'] } as any,
        { id: 2, name: 'Bulbizarre', HP: 50, maxHP: 100, type: ['grass'] } as any,
        { id: 3, name: 'Salameche', HP: 0, maxHP: 100, type: ['fire'] } as any,
    ];

    const mockActivePokemon = mockTeam[0]; // Pikachu est actif

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        vi.mocked(useGameStore).mockReturnValue({
            registerChoice: mockRegisterChoice,
            getTrainer: vi.fn().mockReturnValue({ team: mockTeam }),
        } as any);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('affiche tous les membres de l\'équipe', () => {
        render(<TeamView goBack={mockGoBack} trainerKey="A" activePokemon={mockActivePokemon} />);

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Bulbizarre')).toBeInTheDocument();
        expect(screen.getByText('Salameche')).toBeInTheDocument();
    });

    it('identifie correctement le Pokémon actif', () => {
        render(<TeamView goBack={mockGoBack} trainerKey="A" activePokemon={mockActivePokemon} />);

        // Vérifie la présence du badge "Actif"
        expect(screen.getByText(/actif/i)).toBeInTheDocument();
        
        // Le bouton du Pokémon actif doit être désactivé
        const pikachuButton = screen.getByRole('button', { name: /pikachu/i });
        expect(pikachuButton).toBeDisabled();
    });

    it('désactive le choix d\'un Pokémon KO', () => {
        render(<TeamView goBack={mockGoBack} trainerKey="A" activePokemon={mockActivePokemon} />);

        const salamecheButton = screen.getByRole('button', { name: /salameche/i });
        
        // Vérifie qu'il est désactivé et possède les classes d'opacité
        expect(salamecheButton).toBeDisabled();
        expect(salamecheButton).toHaveClass('opacity-60');
    });

    it('permet de changer de Pokémon s\'il est en vie et non actif', () => {
        render(<TeamView goBack={mockGoBack} trainerKey="A" activePokemon={mockActivePokemon} />);

        const bulbizarreButton = screen.getByRole('button', { name: /bulbizarre/i });
        
        // 1. Clic sur Bulbizarre
        fireEvent.click(bulbizarreButton);

        // 2. Vérifie l'appel au store (SWITCH vers l'index 1)
        expect(mockRegisterChoice).toHaveBeenCalledWith('A', { type: 'SWITCH', pokemonId: 1 });

        // 3. Vérifie le délai avant le retour
        expect(mockGoBack).not.toHaveBeenCalled();
        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(mockGoBack).toHaveBeenCalled();
    });

    it('affiche les couleurs de barre de vie appropriées', () => {
        render(<TeamView goBack={mockGoBack} trainerKey="A" activePokemon={mockActivePokemon} />);

        // Pikachu (100%) -> Vert
        const pikachuBar = screen.getByRole('button', { name: /pikachu/i }).querySelector('.bg-green-500');
        expect(pikachuBar).toBeInTheDocument();

        // Bulbizarre (50%) -> Jaune
        const bulbiBar = screen.getByRole('button', { name: /bulbizarre/i }).querySelector('.bg-yellow-500');
        expect(bulbiBar).toBeInTheDocument();

        // Salameche (0%) -> Rouge
        const salaBar = screen.getByRole('button', { name: /salameche/i }).querySelector('.bg-red-500');
        expect(salaBar).toBeInTheDocument();
    });
});