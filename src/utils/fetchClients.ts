import { Client } from '@/types/client';

export const fetchClients = async (query?: string): Promise<Client[]> => {
    const url = query
        ? `/api/clients/search?q=${encodeURIComponent(query)}`
        : '/api/clients/search';

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des clients');
    }
    const result = await response.json();
    return result.data;
};