import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/ui/Button'; 

describe('Button Component', () => {
    it('affiche correctement le texte enfant (children)', () => {
        render(<Button>Attaquer !</Button>);
        expect(screen.getByText(/Attaquer !/i)).toBeInTheDocument();
    });

    it('appelle la fonction onClick lors du clic', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Clic</Button>);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('ne doit pas appeler onClick quand il est désactivé', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick} disabled={true}>Désactivé</Button>);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(handleClick).not.toHaveBeenCalled();
        expect(button).toBeDisabled();
    });

    it('applique les classes de variante "solid" par défaut', () => {
        render(<Button>Solid</Button>);
        const button = screen.getByRole('button');
        
        // On vérifie une classe clé de la variante solid
        expect(button).toHaveClass('bg-neutral-950');
    });

    it('applique les classes de variante "outline" correctement', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button');
        
        expect(button).toHaveClass('bg-transparent');
        expect(button).toHaveClass('border-2');
    });

    it('applique les styles de désactivation corrects', () => {
        render(<Button disabled={true} variant="solid">Désactivé</Button>);
        const button = screen.getByRole('button');
        
        
        expect(button).toHaveClass('bg-background-500');
        expect(button).toHaveClass('cursor-not-allowed');
    });

    it('ajoute les classes CSS personnalisées via className', () => {
        render(<Button className="mt-10 extra-class">Custom</Button>);
        const button = screen.getByRole('button');
        
        expect(button).toHaveClass('mt-10');
        expect(button).toHaveClass('extra-class');
    });
});