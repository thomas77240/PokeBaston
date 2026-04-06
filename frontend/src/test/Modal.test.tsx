import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../components/ui/Modal'; // Ajuste le chemin


vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Modal Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        // Reset le style du body avant chaque test
        document.body.style.overflow = 'unset';
    });

    it('ne doit rien afficher si isOpen est false', () => {
        render(
            <Modal isOpen={false} onClose={mockOnClose}>
                <div>Contenu Modal</div>
            </Modal>
        );
        expect(screen.queryByText(/Contenu Modal/i)).not.toBeInTheDocument();
    });

    it('doit afficher le contenu si isOpen est true', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div>Contenu Modal</div>
            </Modal>
        );
        expect(screen.getByText(/Contenu Modal/i)).toBeInTheDocument();
    });

    it('doit appeler onClose lors du clic sur l’overlay (fond sombre)', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div>Contenu</div>
            </Modal>
        );

        // L'overlay est la div fixe avec "inset-0"
        // Comme elle contient la modale, on clique sur le fond
        const overlay = screen.getByText(/Contenu/i).parentElement?.parentElement;
        if (overlay) fireEvent.click(overlay);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('ne doit pas appeler onClose lors du clic à l’intérieur de la modale', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <button>Bouton Interne</button>
            </Modal>
        );

        const internalButton = screen.getByText(/Bouton Interne/i);
        fireEvent.click(internalButton);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('doit appeler onClose lors de l’appui sur la touche Escape', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div>Contenu</div>
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('doit bloquer le scroll du body quand elle est ouverte', () => {
        const { unmount } = render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <div>Contenu</div>
            </Modal>
        );

        expect(document.body.style.overflow).toBe('hidden');

        // Vérifie que le scroll est rétabli quand le composant est démonté
        unmount();
        expect(document.body.style.overflow).toBe('unset');
    });
});