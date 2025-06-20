'use client';
import React, { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { ClientForm } from '@/components/ClientForm';
import { useClientSearch } from '@/hooks/useClientSearch';

export default function Home() {
    const [recherche, setRecherche] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { clients, isLoading, error, searchClients } = useClientSearch();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        await searchClients(recherche);
    };

    const handleClientAdded = () => {
        searchClients(recherche);
    };

    const handleRefresh = async () => {
        await searchClients(recherche);
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
                <SearchResults
                    clients={clients}
                    recherche={recherche}
                    onRefresh={handleRefresh}
                    isSubmitted={isSubmitted}
                />
            </div>
        </main>
    );
}