import { renderHook, act } from '@testing-library/react';
import { useClientSearch } from '../useClientSearch';

describe('useClientSearch Hook', () => {
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
        global.fetch = jest.fn();
    });

    it('retourne l\'état initial', () => {
        const { result } = renderHook(() => useClientSearch());

        expect(result.current.clients).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('effectue une recherche avec succès', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ status: 'success', data: mockClients })
        });

        const { result } = renderHook(() => useClientSearch());

        await act(async () => {
            await result.current.searchClients('Dupont');
        });

        expect(result.current.clients).toEqual(mockClients);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('gère les erreurs de l\'API', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ status: 'Erreur serveur' })
        });

        const { result } = renderHook(() => useClientSearch());

        await act(async () => {
            await result.current.searchClients('test');
        });

        expect(result.current.clients).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe('Erreur serveur');
    });

    it('gère les erreurs réseau', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Erreur réseau'));

        const { result } = renderHook(() => useClientSearch());

        await act(async () => {
            await result.current.searchClients('test');
        });

        expect(result.current.clients).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe('Erreur réseau');
    });

    it('encode correctement les paramètres de recherche', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ status: 'success', data: [] })
        });

        const { result } = renderHook(() => useClientSearch());

        await act(async () => {
            await result.current.searchClients('test query');
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/clients/search?q=test%20query');
    });
});