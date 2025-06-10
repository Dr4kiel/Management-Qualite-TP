'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { useClientSearch } from '@/hooks/UseClientSearch';

export default function Home() {
    const [recherche, setRecherche] = useState('');
    const { clients, isLoading, searchClients } = useClientSearch();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await searchClients(recherche);
    };

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <PageTitle title="Recherche de Clients" />
                <SearchBar
                    recherche={recherche}
                    setRecherche={setRecherche}
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                />
                <SearchResults clients={clients} recherche={recherche} />
            </div>
        </main>
    );
}