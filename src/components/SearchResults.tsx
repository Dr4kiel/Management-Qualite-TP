import styles from '@/app/styles/ClientsTable.module.css';
import { ClientsTable } from './ClientsTable';

interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
}

interface SearchResultsProps {
    clients: Client[];
    recherche: string;
}

export const SearchResults = ({ clients, recherche }: SearchResultsProps) => {
    if (clients.length === 0) {
        return (
            <p className={styles.noResults}>
                {recherche ? 'Aucun résultat trouvé' : 'Commencez votre recherche'}
            </p>
        );
    }

    return <ClientsTable clients={clients} />;
};