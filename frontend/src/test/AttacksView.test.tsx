import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react'; // Import global pour stabiliser
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';


import AttacksView from '@/components/Game/AttacksView'; 
import { useGameStore } from '@/stores/useGameStore';
import type { GamePokemon } from '@/types/game.types';


// 1. Mock du store Zustand
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));
// AttacksView.test.tsx

vi.mock('lucide-react', () => ({
    Crosshair: () => <div data-testid="icon-crosshair" />,
    Repeat: () => <div data-testid="icon-repeat" />,
    Zap: () => <div data-testid="icon-zap" />,
    ChevronLeft: () => <div data-testid="icon-chevron-left" />, // <-- L'icône manquante était ici !
}));

vi.mock('../TeamConfig/ConfigHeader', () => ({
    // On retourne une simple fonction qui rend du texte
    default: () => <div data-testid="mock-header" /> 
}));

// Mock simple de TypeColoredItem s'il pose problème
vi.mock('../ui/TypeColoredItem', () => ({
    TypeColoredItem: ({ children }: any) => <span>{children}</span>
}));

// 2. Mock des images (très important pour que Vite ne plante pas sur les imports .png dans les tests)
vi.mock('@/assets/images/move_physical.png', () => ({ default: 'physical-icon.png' }));
vi.mock('@/assets/images/move_special.png', () => ({ default: 'special-icon.png' }));

describe('AttacksView', () => {
    const mockRegisterChoice = vi.fn();
    const mockGoBack = vi.fn();

    // Création d'un faux Pokémon avec 2 attaques pour les tests
    const mockPokemon = {
        name: 'Pikachu',
        moves: [
            { name: 'Charge', type: 'normal', category: 'physical', PP: 35, power: 40, accuracy: 100 },
            { name: 'Tonnerre', type: 'electric', category: 'special', PP: 15, power: 90, accuracy: 100 }
        ]
    } as unknown as GamePokemon;

    beforeEach(() => {
        // Avant chaque test, on réinitialise les compteurs de nos espions
        vi.clearAllMocks();
        
        // On connecte notre fausse fonction au store mocké
        vi.mocked(useGameStore).mockReturnValue({
            registerChoice: mockRegisterChoice,
        } as any);
    });

    afterEach(() => {
        // Nettoyage des timers si on les a modifiés
        vi.useRealTimers();
    });

    it('affiche le nom du Pokémon et ses attaques', () => {
        render(
            <AttacksView goBack={mockGoBack} activePokemon={mockPokemon} trainerKey="A" />
        );

        // Vérifie le titre
        expect(screen.getByText('Que doit faire Pikachu ?')).toBeInTheDocument();
        
        // Vérifie que les boutons d'attaques sont présents
        expect(screen.getByText('Charge')).toBeInTheDocument();
        expect(screen.getByText('Tonnerre')).toBeInTheDocument();
    });

    it('affiche les détails de l\'attaque au survol (hover) et les cache ensuite', () => {
        render(
            <AttacksView goBack={mockGoBack} activePokemon={mockPokemon} trainerKey="A" />
        );

        const chargeButton = screen.getByText('Charge').closest('button');
        expect(chargeButton).not.toBeNull();

        // 1. On simule l'entrée de la souris sur le bouton "Charge"
        fireEvent.mouseEnter(chargeButton!);

        // Vérifie que les détails apparaissent (Puissance 40, PP 35)
        expect(screen.getByText('35')).toBeInTheDocument(); // PP
        expect(screen.getByText('40')).toBeInTheDocument(); // Puissance
        expect(screen.getByText('Physique')).toBeInTheDocument(); // Catégorie

        // 2. On simule la sortie de la souris
        fireEvent.mouseLeave(chargeButton!);

        // Vérifie que la zone de détails a disparu
        expect(screen.queryByText('Physique')).not.toBeInTheDocument();
    });

    it('enregistre le choix et revient en arrière avec un délai lors du clic', () => {
        // On active le contrôle du temps pour Vitest
        vi.useFakeTimers(); 

        render(
            <AttacksView goBack={mockGoBack} activePokemon={mockPokemon} trainerKey="A" />
        );

        const tonnerreButton = screen.getByText('Tonnerre').closest('button');
        
        // On clique sur la deuxième attaque (index 1)
        fireEvent.click(tonnerreButton!);

        // 1. Vérifie que le store a reçu l'ordre
        expect(mockRegisterChoice).toHaveBeenCalledTimes(1);
        expect(mockRegisterChoice).toHaveBeenCalledWith('A', { type: 'ATTACK', moveId: 1 });

        // 2. Vérifie que goBack N'A PAS encore été appelé (à cause du setTimeout)
        expect(mockGoBack).not.toHaveBeenCalled();

        // 3. On fait avancer le temps de 200ms
        act(() => {
            vi.advanceTimersByTime(200);
        });

        // 4. Maintenant, goBack devrait avoir été appelé
        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('ne plante pas si aucun Pokémon n\'est actif', () => {
        const { container } = render(
            <AttacksView goBack={mockGoBack} activePokemon={null} trainerKey="A" />
        );
        
        // S'assure que le rendu se fait sans erreur fatale, même sans données
        expect(container).toBeInTheDocument();
        // On ajoute / /i autour du texte pour une recherche partielle et insensible à la casse
        expect(screen.queryByText(/Que doit faire/i)).toBeInTheDocument();;
    });
});