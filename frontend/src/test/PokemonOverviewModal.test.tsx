import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PokemonOverviewModal from '@/components/TeamConfig/PokemonOverviewModal';

// Mock de framer-motion pour éviter les erreurs d'animation
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('PokemonOverviewModal Component', () => {
    const mockPokemon = {
        id: 25,
        name: 'Pikachu',
        types: ['Électrik'],
        stats: { HP: 35, ATK: 55, DEF: 40, SPA: 50, SPD: 50, SPE: 90 },
    };

    const mockMoves = [
        { id: 1, name: 'Tonnerre', type: 'Électrik', category: 'special', power: 90, accuracy: 100, PP: 15 },
        { id: 2, name: 'Charge', type: 'Normal', category: 'physical', power: 40, accuracy: 100, PP: 35 },
        { id: 3, name: 'Vive-Attaque', type: 'Normal', category: 'physical', power: 40, accuracy: 100, PP: 30 },
        { id: 4, name: 'Cage-Éclair', type: 'Électrik', category: 'special', power: null, accuracy: 90, PP: 20 },
        { id: 5, name: 'Souplesse', type: 'Normal', category: 'physical', power: 80, accuracy: 75, PP: 20 },
    ];

    const mockTrainer = {
        name: 'Sacha',
        team: [],
        activePokemon: 0
    };

    const mockAddPokemon = vi.fn();
    const mockCloseModal = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche correctement les informations de base du Pokémon', async () => {
    render(
        <PokemonOverviewModal
            pokemon={mockPokemon as any}
            availableMoves={mockMoves as any}
            trainer={mockTrainer as any}
            addPokemon={mockAddPokemon}
            closeModal={mockCloseModal}
        />
    );

        const typeBadges = screen.getAllByText(/Électrik/i);
    
        expect(typeBadges[0]).toBeInTheDocument();
    
    });
    

    it('permet de sélectionner et désélectionner des attaques', () => {
        render(
            <PokemonOverviewModal
                pokemon={mockPokemon as any}
                availableMoves={mockMoves as any}
                trainer={mockTrainer as any}
                addPokemon={mockAddPokemon}
                closeModal={mockCloseModal}
            />
        );

        const moveButton = screen.getAllByRole('button')[1]; // Premier bouton d'attaque (Tonnerre)
        
        // Sélection
        fireEvent.click(moveButton);
        expect(screen.getByText('1 / 4')).toBeInTheDocument();

        // Désélection
        fireEvent.click(moveButton);
        expect(screen.getByText('0 / 4')).toBeInTheDocument();
    });

    it('limite la sélection à 4 attaques maximum', async () => {
    render(
        <PokemonOverviewModal
            pokemon={mockPokemon as any}
            availableMoves={mockMoves as any}
            trainer={mockTrainer as any}
            addPokemon={mockAddPokemon}
            closeModal={mockCloseModal}
        />
    );

    // 1. On récupère tous les boutons
    const allButtons = screen.getAllByRole('button');

    // On filtre pour ne garder que les boutons de sélection
    // Ces boutons contiennent soit l'icône Circle, soit CircleCheck (lucide-circle)
    const selectionButtons = allButtons.filter(btn => 
        btn.innerHTML.includes('lucide-circle') || btn.innerHTML.includes('circle')
    );

    // 3. On clique sur les 5 boutons de sélection
    // (Même si on clique sur 5, le code est censé bloquer à 4)
    selectionButtons.forEach(btn => {
        fireEvent.click(btn);
    });

    // 4. On vérifie le compteur
    // On utilise findByText (async) au cas où l'affichage met du temps a se mettre a jour
    const counter = await screen.findByText(/4 \/ 4/i);
    expect(counter).toBeInTheDocument();
    
    
    expect(counter).toHaveClass('text-green-700');
});

    it('affiche le panneau de détails quand on clique sur l’icône œil', async () => {
    render(
        <PokemonOverviewModal
            pokemon={mockPokemon as any}
            availableMoves={mockMoves as any}
            trainer={mockTrainer as any}
            addPokemon={mockAddPokemon}
            closeModal={mockCloseModal}
        />
    );

    // On cherche le bouton qui contient l'icône "Eye"
    // On utilise querySelector pour vérifier la classe de l'icône Lucide
    const allButtons = screen.getAllByRole('button');
    const eyeButton = allButtons.find(btn => 
        btn.innerHTML.includes('lucide-eye') || btn.innerHTML.includes('Eye')
    );

    if (!eyeButton) throw new Error("Bouton Oeil non trouvé");

    // 2. On clique sur l'oeil
    fireEvent.click(eyeButton);

    // 3. On attend que "Puissance" apparaisse (asynchrone)
    const puissanceLabel = await screen.findByText(/Puissance/i);
    
    expect(puissanceLabel).toBeInTheDocument();
});

    it('désactive le bouton si l’équipe est pleine (6 Pokémon)', () => {
        const fullTeamTrainer = {
            ...mockTrainer,
            team: new Array(6).fill({ pokemon: { id: 999 }, moves: [] })
        };

        render(
            <PokemonOverviewModal
                pokemon={mockPokemon as any}
                availableMoves={mockMoves as any}
                trainer={fullTeamTrainer as any}
                addPokemon={mockAddPokemon}
                closeModal={mockCloseModal}
            />
        );

        // Sélectionner une attaque pour faire apparaître le footer
        fireEvent.click(screen.getAllByRole('button')[1]);

        const validateButton = screen.getByText(/Equipe pleine/i);
        expect(validateButton).toBeDisabled();
    });

    it('appelle addPokemon et closeModal lors de la validation', () => {
        render(
            <PokemonOverviewModal
                pokemon={mockPokemon as any}
                availableMoves={mockMoves as any}
                trainer={mockTrainer as any}
                addPokemon={mockAddPokemon}
                closeModal={mockCloseModal}
            />
        );

        // Sélectionner une attaque
        fireEvent.click(screen.getAllByRole('button')[1]);
        
        const validateButton = screen.getByText(/Ajouter à l'équipe/i);
        fireEvent.click(validateButton);

        expect(mockAddPokemon).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
    });
});