'use client';

import { useEffect, useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { ClientForm } from '@/components/ClientForm';
import { fetchClients } from '@/utils/fetchClients';
import { Client } from '@/types/client';

export default function Home() {
    const [clients, setClients] = useState<Client[]>([]);
    const [recherche, setRecherche] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Nouvelle état pour stocker la recherche validée
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setIsSubmitted(true);
        setSearchTerm(recherche); // Met à jour le terme de recherche validé
        try {
            const data = await fetchClients(recherche);
            setClients(data);
        } catch (err) {
            setError('Erreur lors de la recherche');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            const newClients = await fetchClients();
            setClients(newClients);
            setSearchTerm('');
            setIsSubmitted(false);
        } catch (err) {
            setError('Erreur lors du rafraîchissement');
        } finally {
            setIsLoading(false);
        }
    };

    const refreshClients = async () => {
        setIsLoading(true);
        setError(null);
        setIsSubmitted(false);
        try {
            const data = await fetchClients();
            setClients(data);
        } catch (err) {
            setError('Erreur lors du chargement des clients');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshClients();
    }, []);

    return (
        <main>
            <div className="container">
                <PageTitle title="Gestion des Clients" />
                <ClientForm onClientAdded={refreshClients} />
                <SearchBar
                    recherche={recherche}
                    setRecherche={setRecherche}
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                />
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <SearchResults
                    clients={clients}
                    recherche={searchTerm}
                    onRefresh={handleRefresh}
                    isSubmitted={isSubmitted}
                />
            </div>
        </main>
    );
}