import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Home from '../home';
import { useClientSearch } from '@/hooks/useClientSearch';

jest.mock('@/hooks/useClientSearch');

describe('Home Page', () => {
  const mockSearchClients = jest.fn();
  const mockClients = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      dateNaissance: '1990-01-01',
      adresse: '123 rue Test',
      codePostal: '75000',
      ville: 'Paris',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  beforeEach(() => {
    useClientSearch.mockImplementation(() => ({
      clients: [],
      isLoading: false,
      error: null,
      searchClients: mockSearchClients
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le titre de la page', () => {
    render(<Home />);
    expect(screen.getByText('Gestion des Clients')).toBeInTheDocument();
  });

  it('effectue une recherche lors de la soumission du formulaire', () => {
    render(<Home />);
    const searchInput = screen.getByRole('textbox');
    const searchForm = screen.getByTestId('search-form');

    fireEvent.change(searchInput, { target: { value: 'Dupont' } });
    fireEvent.submit(searchForm);

    expect(mockSearchClients).toHaveBeenCalledWith('Dupont');
  });

  it('affiche un message d\'erreur', () => {
    useClientSearch.mockImplementation(() => ({
      clients: [],
      isLoading: false,
      error: 'Une erreur est survenue',
      searchClients: mockSearchClients
    }));

    render(<Home />);
    expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
  });

  it('affiche les résultats de recherche', () => {
    useClientSearch.mockImplementation(() => ({
      clients: mockClients,
      isLoading: false,
      error: null,
      searchClients: mockSearchClients
    }));

    render(<Home />);
    expect(screen.getByText('Dupont')).toBeInTheDocument();
    expect(screen.getByText('Jean')).toBeInTheDocument();
  });
});