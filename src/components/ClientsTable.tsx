import styles from '@/app/styles/ClientsTable.module.css';

interface Client {
    id: number;
    nom: string;
    email: string;
    telephone: string;
}

interface ClientsTableProps {
    clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.tableHeader}>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>{client.nom}</td>
                        <td className={styles.tableCell}>{client.email}</td>
                        <td className={styles.tableCell}>{client.telephone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};