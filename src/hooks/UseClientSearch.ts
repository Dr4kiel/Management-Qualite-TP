import { useState } from 'react';

interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
}

export const useClientSearch = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchClients = async (query: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/clients/search?query=${query}`);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { clients, isLoading, searchClients };
};