import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react'; 
import TrainerMenu from '../components/Game/TrainerMenu';

// 1. MOCK DU STORE (Indispensable car TrainerMenu ou ses enfants l'utilisent)
vi.mock('@/stores/useGameStore', () => ({
    useGameStore: vi.fn(() => ({
        registerChoice: vi.fn(),
        getTrainer: vi.fn(() => ({ team: [] }))
    })),
}));

// 2. MOCK DE FRAMER MOTION (Correction du warning 'key')
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }: any) => {
            // On extrait key pour ne pas le passer à la div (interdit en React)
            const { key, initial, animate, exit, transition, ...rest } = props;
            return <div className={className} {...rest}>{children}</div>;
        },
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// 3. MOCKS DES ENFANTS (Chemins relatifs depuis src/test/ vers src/components/Game/)
vi.mock('../components/Game/TeamView', () => ({
    default: ({ goBack }: any) => (
        <div data-testid="team-view">
            <button onClick={goBack}>Retour de Team</button>
        </div>
    )
}));

vi.mock('../components/Game/AttacksView', () => ({
    default: ({ goBack }: any) => (
        <div data-testid="attacks-view">
            <button onClick={goBack}>Retour de Attacks</button>
        </div>
    )
}));

vi.mock('../components/ui/Button', () => ({
    default: ({ children, onClick, className }: any) => (
        <button onClick={onClick} className={className}>{children}</button>
    )
}));

describe('TrainerMenu Component', () => {
    const mockTrainer = {
        name: 'Sacha',
        activePokemon: 0,
        team: [{ id: 1, name: 'Pikachu', HP: 100, maxHP: 100, type: ['electric'] }]
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('bascule entre les vues correctement', () => {
        render(<TrainerMenu trainer={mockTrainer as any} trainerKey="A" />);

        // 1. Home
        expect(screen.getByText(/Que voulez vous faire/i)).toBeInTheDocument();

        // 2. Aller dans Équipe
        fireEvent.click(screen.getByText('Équipe'));
        expect(screen.getByTestId('team-view')).toBeInTheDocument();

        // 3. Revenir
        fireEvent.click(screen.getByText('Retour de Team'));
        expect(screen.getByText(/Que voulez vous faire/i)).toBeInTheDocument();

        // 4. Aller dans Attaquer
        fireEvent.click(screen.getByText('Attaquer'));
        expect(screen.getByTestId('attacks-view')).toBeInTheDocument();
    });
});