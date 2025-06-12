'use client';
import React from 'react';
import { ClientsTable } from './ClientsTable';
import { Client } from '@/types/client';
import {fetchClients} from "@/utils/fetchClients";

interface SearchResultsProps {
    clients: Client[];
    recherche: string;
    onRefresh: () => Promise<void>;
    isSubmitted: boolean;
}

export const SearchResults = ({ clients, recherche, onRefresh, isSubmitted }: SearchResultsProps) => {
    if (clients.length === 0 && recherche && isSubmitted) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>Aucun résultat trouvé pour "{recherche}"</p>
            </div>
        );
    }

    if (clients.length === 0 && !isSubmitted) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>Veuillez effectuer une recherche</p>
            </div>
        );
    }

    return <ClientsTable clients={clients} onRefresh={onRefresh} />;
};