'use client';
import React from 'react';
import { Client } from '@/types/client';
import styles from '@/app/styles/ClientsTable.module.css';

interface ClientsTableProps {
    clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR');
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};