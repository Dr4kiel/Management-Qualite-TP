import React from 'react';
import { render, screen } from '@testing-library/react';
import { ClientsTable } from '../ClientsTable';

describe('ClientsTable Component', () => {
    const mockClients = [
        {
            id: 1,
            nom: 'Dupont',
            prenom: 'Jean',
            dateNaissance: '1990-01-15',
            adresse: '123 rue Example',
            codePostal: '75001',
            ville: 'Paris'
        }
    ];

    it('rend correctement le tableau avec les en-têtes', () => {
        render(<ClientsTable clients={mockClients} />);

        expect(screen.getByText('Nom')).toBeInTheDocument();
        expect(screen.getByText('Prénom')).toBeInTheDocument();
        expect(screen.getByText('Date de naissance')).toBeInTheDocument();
        expect(screen.getByText('Adresse')).toBeInTheDocument();
        expect(screen.getByText('Code postal')).toBeInTheDocument();
        expect(screen.getByText('Ville')).toBeInTheDocument();
    });

    it('affiche correctement les données du client', () => {
        render(<ClientsTable clients={mockClients} />);

        expect(screen.getByText('Dupont')).toBeInTheDocument();
        expect(screen.getByText('Jean')).toBeInTheDocument();
        expect(screen.getByText('15/01/1990')).toBeInTheDocument();
        expect(screen.getByText('123 rue Example')).toBeInTheDocument();
        expect(screen.getByText('75001')).toBeInTheDocument();
        expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    it('gère un tableau vide', () => {
        render(<ClientsTable clients={[]} />);

        expect(screen.getByRole('table')).toBeInTheDocument();
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(1);
    });
});