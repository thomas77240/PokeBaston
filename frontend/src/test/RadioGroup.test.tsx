import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RadioGroup from '../components/ui/RadioGroup'; // Ajuste le chemin selon ta structure

describe('RadioGroup Component', () => {
    const mockOptions = [
        { label: 'Facile', value: 'easy' },
        { label: 'Normal', value: 'normal' },
        { label: 'Difficile', value: 'hard' },
    ];

    const mockOnChange = vi.fn();

    it('affiche toutes les options avec leurs labels', () => {
        render(
            <RadioGroup 
                name="difficulty" 
                options={mockOptions} 
                selectedValue="normal" 
                onChange={mockOnChange} 
            />
        );

        mockOptions.forEach(option => {
            expect(screen.getByLabelText(option.label)).toBeInTheDocument();
        });
    });

    it('coche la bonne option en fonction de selectedValue', () => {
        render(
            <RadioGroup 
                name="difficulty" 
                options={mockOptions} 
                selectedValue="easy" 
                onChange={mockOnChange} 
            />
        );

        const easyRadio = screen.getByLabelText('Facile') as HTMLInputElement;
        const hardRadio = screen.getByLabelText('Difficile') as HTMLInputElement;

        expect(easyRadio.checked).toBe(true);
        expect(hardRadio.checked).toBe(false);
    });

    it('applique le bon attribut "name" à tous les inputs', () => {
        render(
            <RadioGroup 
                name="game-mode" 
                options={mockOptions} 
                selectedValue="easy" 
                onChange={mockOnChange} 
            />
        );

        const allRadios = screen.getAllByRole('radio');
        allRadios.forEach(radio => {
            expect(radio).toHaveAttribute('name', 'game-mode');
        });
    });

    it('appelle onChange avec la valeur correcte lors d’un clic', () => {
        render(
            <RadioGroup 
                name="difficulty" 
                options={mockOptions} 
                selectedValue="normal" 
                onChange={mockOnChange} 
            />
        );

        const hardOption = screen.getByLabelText('Difficile');
        fireEvent.click(hardOption);

        expect(mockOnChange).toHaveBeenCalledWith('hard');
    });

    it('ajoute la classe CSS personnalisée au conteneur', () => {
        const customClass = 'mt-4 border-2';
        render(
            <RadioGroup 
                name="test" 
                options={mockOptions} 
                selectedValue="easy" 
                onChange={mockOnChange} 
                className={customClass} 
            />
        );

        // On cherche la div parente qui contient les options
        const container = screen.getByLabelText('Facile').closest('div');
        expect(container).toHaveClass('mt-4');
        expect(container).toHaveClass('border-2');
    });
});