/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TrainerMenu from '@/components/Game/TrainerMenu';
import { useGameStore } from '@/stores/useGameStore';

// 1. MOCK DU STORE
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

// 3. MOCKS DES ENFANTS (Avec des chemins absolus @/ pour éviter les bugs de dossiers)
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

// 4. MOCK DES ICONES (Pour éviter les soucis avec lucide-react)
vi.mock('lucide-react', () => ({
    Swords: () => React.createElement('div', { 'data-testid': 'icon-swords' }),
    Users: () => React.createElement('div', { 'data-testid': 'icon-users' }),
}));

describe('TrainerMenu Component', () => {
    const mockTrainer = {
        name: 'Sacha',
        activePokemon: 0,
        team: [{ id: 1, name: 'Pikachu', hp: 100, baseStats: { HP: 100 }, type: ['electric'] }]
    };

    beforeEach(() => {
        vi.clearAllMocks();
        
        // Setup de base du store pour les tests
        (useGameStore as any).mockReturnValue({
            phase: 'WAITING_FOR_TURN',
            getWaitingForReplacement: vi.fn(() => null),
        });
    });

    it('bascule entre les vues correctement', () => {
        render(<TrainerMenu trainer={mockTrainer as any} trainerKey="A" />);

        // 1. Home
        expect(screen.getByText(/Que voulez-vous faire/i)).toBeInTheDocument();

        // 2. Aller dans Équipe
        fireEvent.click(screen.getByText('Équipe'));
        expect(screen.getByTestId('team-view')).toBeInTheDocument();

        // 3. Revenir
        fireEvent.click(screen.getByText('Retour de Team'));
        expect(screen.getByText(/Que voulez-vous faire/i)).toBeInTheDocument();

        // 4. Aller dans Attaquer
        fireEvent.click(screen.getByText('Attaquer'));
        expect(screen.getByTestId('attacks-view')).toBeInTheDocument();
    });

    it('n\'affiche rien si un autre dresseur doit remplacer son Pokémon', () => {
        // On modifie le mock pour simuler que c'est au joueur B de choisir un remplaçant
        (useGameStore as any).mockReturnValue({
            phase: 'WAITING_FOR_B_TO_SWITCH',
            getWaitingForReplacement: vi.fn(() => 'B'),
        });

        const { container } = render(<TrainerMenu trainer={mockTrainer as any} trainerKey="A" />);

        // Le composant du Joueur A doit renvoyer "null" et ne rien afficher
        expect(container).toBeEmptyDOMElement();
    });
});