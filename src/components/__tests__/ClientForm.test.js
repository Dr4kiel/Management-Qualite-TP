import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClientForm } from '../ClientForm';

describe('ClientForm Component', () => {
    const mockOnClientAdded = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('affiche/cache le formulaire lors du clic sur le bouton', () => {
        render(<ClientForm onClientAdded={mockOnClientAdded} />);

        expect(screen.queryByRole('client-form')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Ajouter un client'));
        expect(screen.getByRole('client-form')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Fermer'));
        expect(screen.queryByRole('client-form')).not.toBeInTheDocument();
    });

    it('met à jour les champs du formulaire', () => {
        render(<ClientForm onClientAdded={mockOnClientAdded} />);

        fireEvent.click(screen.getByText('Ajouter un client'));

        const nomInput = screen.getByLabelText('Nom');
        fireEvent.change(nomInput, { target: { value: 'Dupont' } });
        expect(nomInput).toHaveValue('Dupont');

        const prenomInput = screen.getByLabelText('Prénom');
        fireEvent.change(prenomInput, { target: { value: 'Jean' } });
        expect(prenomInput).toHaveValue('Jean');
    });

    it('soumet le formulaire avec succès', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

        render(<ClientForm onClientAdded={mockOnClientAdded} />);

        fireEvent.click(screen.getByText('Ajouter un client'));

        const testData = {
            nom: 'Dupont',
            prenom: 'Jean',
            dateNaissance: '1990-01-01',
            adresse: '123 rue Test',
            codePostal: '75000',
            ville: 'Paris'
        };

        fireEvent.change(screen.getByLabelText('Nom'), { target: { value: testData.nom } });
        fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: testData.prenom } });
        fireEvent.change(screen.getByLabelText('Date de naissance'), { target: { value: testData.dateNaissance } });
        fireEvent.change(screen.getByLabelText('Adresse'), { target: { value: testData.adresse } });
        fireEvent.change(screen.getByLabelText('Code postal'), { target: { value: testData.codePostal } });
        fireEvent.change(screen.getByLabelText('Ville'), { target: { value: testData.ville } });

        fireEvent.submit(screen.getByRole('client-form'));

        await waitFor(() => {
            expect(mockOnClientAdded).toHaveBeenCalled();
            expect(screen.queryByRole('form')).not.toBeInTheDocument();
        });
    });

    it('affiche une erreur en cas d\'échec de la soumission', async () => {
        const errorMessage = 'Erreur test';
        global.fetch = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

        render(<ClientForm onClientAdded={mockOnClientAdded} />);

        fireEvent.click(screen.getByText('Ajouter un client'));
        fireEvent.submit(screen.getByRole('client-form'));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});