import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResults } from '../SearchResults';

jest.mock('../ClientsTable', () => ({
    ClientsTable: () => <div data-testid="clients-table">Table des clients</div>
}));

describe('SearchResults Component', () => {
    const mockClients = [
        { id: 1, nom: 'Test Client', email: 'test@example.com' }
    ];

    it('affiche le message initial quand il n\'y a pas de clients ni de recherche', () => {
        render(<SearchResults clients={[]} recherche="" />);
        expect(screen.getByText('Veuillez effectuer une recherche')).toBeInTheDocument();
    });

    it('affiche un message quand aucun résultat n\'est trouvé', () => {
        render(<SearchResults clients={[]} recherche="test" isSubmitted={true}/>);
        expect(screen.getByText('Aucun résultat trouvé pour "test"')).toBeInTheDocument();
    });

    it('affiche la table des clients quand des résultats sont disponibles', () => {
        render(<SearchResults clients={mockClients} recherche="test" />);
        expect(screen.getByTestId('clients-table')).toBeInTheDocument();
    });
});