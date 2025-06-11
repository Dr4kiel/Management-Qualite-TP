'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { ClientForm } from '@/components/ClientForm';
import { useClientSearch } from '@/hooks/useClientSearch';

export default function Home() {
    const [recherche, setRecherche] = useState('');
    const { clients, isLoading, error, searchClients } = useClientSearch();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await searchClients(recherche);
    };

    const handleClientAdded = () => {
        searchClients(recherche); // Rafraîchit la liste après l'ajout
    };

    return (
        <main>
            <div className="container">
                <PageTitle title="Gestion des Clients" />
                <ClientForm onClientAdded={handleClientAdded} />
                <SearchBar
                    recherche={recherche}
                    setRecherche={setRecherche}
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                />
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <SearchResults clients={clients} recherche={recherche} />
            </div>
        </main>
    );
}