'use client';
import React from 'react';
import { useState } from 'react';
import { Client } from '@/types/client';
import styles from '@/app/styles/ClientsTable.module.css';

interface ClientsTableProps {
    clients: Client[];
    onRefresh: () => Promise<void>;
}

export const ClientsTable = ({ clients, onRefresh }: ClientsTableProps) => {
    const [editClient, setEditClient] = useState<Client | null>(null);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR');
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Supprimer ce client ?')) {
            await fetch(`/api/clients/search?id=${id}`, { method: 'DELETE' });
            await onRefresh();
        }
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editClient) return;
        const form = e.currentTarget;
        const data = {
            id: editClient.id,
            nom: (form.nom as any).value,
            prenom: (form.prenom as any).value,
            dateNaissance: (form.dateNaissance as any).value,
            adresse: (form.adresse as any).value,
            codePostal: (form.codePostal as any).value,
            ville: (form.ville as any).value,
        };
        await fetch('/api/clients/search', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        setEditClient(null);
        await onRefresh();
    };

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.tableHeader}>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Adresse</th>
                    <th>Code postal</th>
                    <th>Ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>{client.nom}</td>
                        <td className={styles.tableCell}>{client.prenom}</td>
                        <td className={styles.tableCell}>{formatDate(client.dateNaissance)}</td>
                        <td className={styles.tableCell}>{client.adresse}</td>
                        <td className={styles.tableCell}>{client.codePostal}</td>
                        <td className={styles.tableCell}>{client.ville}</td>
                        <td className={styles.tableCell}>
                            <button onClick={() => setEditClient(client)} className={styles.editButton}>Modifier</button>
                            <button onClick={() => handleDelete(client.id)} className={styles.deleteButton}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editClient && (
                <div className={styles.popup}>
                    <form onSubmit={handleEditSubmit} className={styles.popupForm}>
                        <input name="nom" defaultValue={editClient.nom} required />
                        <input name="prenom" defaultValue={editClient.prenom} required />
                        <input name="dateNaissance" type="date" defaultValue={editClient.dateNaissance?.slice(0,10)} required />
                        <input name="adresse" defaultValue={editClient.adresse} required />
                        <input name="codePostal" defaultValue={editClient.codePostal} required />
                        <input name="ville" defaultValue={editClient.ville} required />
                        <button type="submit">Valider</button>
                        <button type="button" onClick={() => setEditClient(null)}>Annuler</button>
                    </form>
                </div>
            )}
        </div>
    );
};