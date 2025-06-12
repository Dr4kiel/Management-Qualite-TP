'use client';

import { useState } from 'react';
import { Client } from '@/types/client';

interface SearchResponse {
    status: string;
    data: Client[];
}

export const useClientSearch = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchClients = async (query: string) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/clients/search?q=${encodeURIComponent(query)}`);
            const data: SearchResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.status || 'Une erreur est survenue');
            }

            setClients(data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            setClients([]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        clients,
        isLoading,
        error,
        searchClients
    };
};