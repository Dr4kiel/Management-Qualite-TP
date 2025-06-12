import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar Component', () => {
    const mockSetRecherche = jest.fn();
    const mockOnSubmit = jest.fn();

    const defaultProps = {
        recherche: '',
        setRecherche: mockSetRecherche,
        onSubmit: mockOnSubmit,
        isLoading: false
    };

    it('rend correctement la barre de recherche', () => {
        render(<SearchBar {...defaultProps} />);

        expect(screen.getByPlaceholderText('Rechercher un client...')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Rechercher');
    });

    it('gère la saisie de texte', () => {
        render(<SearchBar {...defaultProps} />);

        const input = screen.getByPlaceholderText('Rechercher un client...');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(mockSetRecherche).toHaveBeenCalledWith('test');
    });

    it('gère la soumission du formulaire', () => {
        render(<SearchBar {...defaultProps} />);

        const form = screen.getByTestId('search-form');
        fireEvent.submit(form);

        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('affiche le bon état pendant le chargement', () => {
        render(<SearchBar {...defaultProps} isLoading={true} />);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveTextContent('Recherche...');
    });
});