import { ClientsTable } from './ClientsTable';
import { Client } from '@/types/client';

interface SearchResultsProps {
    clients: Client[];
    recherche: string;
}

export const SearchResults = ({ clients, recherche }: SearchResultsProps) => {
    if (clients.length === 0 && recherche) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>Aucun résultat trouvé pour "{recherche}"</p>
            </div>
        );
    }

    if (clients.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>Veuillez effectuer une recherche</p>
            </div>
        );
    }

    return <ClientsTable clients={clients} />;
};