/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TrainerMenu from '@/components/Game/TrainerMenu';
import { useGameStore } from '@/stores/useGameStore';

// 1. MOCK DU STORE ZUSTAND
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(),
}));

// 2. MOCK DE FRAMER MOTION (Sans balises JSX pour éviter l'erreur useContext)
vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ initial, animate, exit, transition, variants, ...props }: any, ref: any) => 
            React.createElement('div', { ...props, ref })
        ),
    },
    AnimatePresence: ({ children }: any) => children,
}));

// 3. MOCKS DES COMPOSANTS ENFANTS (Chemins absolus @/)
vi.mock('@/components/Game/TeamView', () => ({
    default: ({ goBack }: any) => React.createElement('div', { 'data-testid': 'team-view' }, 
        React.createElement('button', { onClick: goBack }, 'Retour de Team')
    )
}));

vi.mock('@/components/Game/AttacksView', () => ({
    default: ({ goBack }: any) => React.createElement('div', { 'data-testid': 'attacks-view' }, 
        React.createElement('button', { onClick: goBack }, 'Retour de Attacks')
    )
}));

// 4. MOCK DES ICONES LUCIDE
vi.mock('lucide-react', () => ({
    Swords: () => React.createElement('div', { 'data-testid': 'icon-swords' }),
    Users: () => React.createElement('div', { 'data-testid': 'icon-users' }),
}));

describe('TrainerMenu Component', () => {
    // Données fictives du dresseur
    const mockTrainer = {
        name: 'Sacha',
        activePokemon: 0,
        team: [{ id: 1, name: 'Pikachu', hp: 100, baseStats: { HP: 100 }, type: ['electric'] }]
    };

    // Création d'un mock stable pour la fonction du store
    const mockGetWaitingForReplacement = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        
        // Par défaut, aucun dresseur n'attend de remplacement
        mockGetWaitingForReplacement.mockReturnValue(null);
        
        // Initialisation de Zustand pour tous les tests
        (useGameStore as any).mockReturnValue({
            phase: 'WAITING_FOR_TURN',
            getWaitingForReplacement: mockGetWaitingForReplacement,
        });
    });

    it('bascule entre les vues correctement', () => {
        render(<TrainerMenu trainer={mockTrainer as any} trainerKey="A" />);

        // 1. Vue Accueil par défaut
        expect(screen.getByText(/Que voulez-vous faire/i)).toBeInTheDocument();

        // 2. Navigation vers la vue Équipe
        fireEvent.click(screen.getByText('Équipe'));
        expect(screen.getByTestId('team-view')).toBeInTheDocument();

        // 3. Retour à l'accueil
        fireEvent.click(screen.getByText('Retour de Team'));
        expect(screen.getByText(/Que voulez-vous faire/i)).toBeInTheDocument();

        // 4. Navigation vers la vue Attaquer
        fireEvent.click(screen.getByText('Attaquer'));
        expect(screen.getByTestId('attacks-view')).toBeInTheDocument();
    });

    it('n\'affiche rien si un autre dresseur doit remplacer son Pokémon', () => {
        // On indique que c'est au joueur B de choisir un Pokémon
        mockGetWaitingForReplacement.mockReturnValue('B');
        
        // On met à jour le store spécifiquement pour ce test
        (useGameStore as any).mockReturnValue({
            phase: 'WAITING_FOR_B_TO_SWITCH',
            getWaitingForReplacement: mockGetWaitingForReplacement,
        });

        // On rend le composant pour le joueur A
        const { container } = render(<TrainerMenu trainer={mockTrainer as any} trainerKey="A" />);

        // Le composant A doit renvoyer "null" et ne rien rendre dans le DOM
        expect(container).toBeEmptyDOMElement();
    });
});