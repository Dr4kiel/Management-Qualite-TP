// src/app/page.tsx
'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { useClientSearch } from '@/hooks/UseClientSearch';

export default function Home() {
    const [recherche, setRecherche] = useState('');
    const { clients, isLoading, error, searchClients } = useClientSearch();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await searchClients(recherche);
    };

    return (
        <main>
            <div className="container">
                <PageTitle title="Recherche de Clients" />
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