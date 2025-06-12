// src/components/ClientForm.tsx
import { useState } from 'react';
import styles from '@/app/styles/ClientForm.module.css';
import { Client } from '@/types/client';

interface ClientFormProps {
    onClientAdded: () => void;
}

type ClientFormData = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

export const ClientForm = ({ onClientAdded }: ClientFormProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<ClientFormData>({
        nom: '',
        prenom: '',
        dateNaissance: '',
        adresse: '',
        codePostal: '',
        ville: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/clients/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du client');
            }

            setFormData({
                nom: '',
                prenom: '',
                dateNaissance: '',
                adresse: '',
                codePostal: '',
                ville: '',
            });
            setIsOpen(false);
            onClientAdded();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <button
                className={styles.addButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Fermer' : 'Ajouter un client'}
            </button>

            {isOpen && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                id="nom"
                                required
                                value={formData.nom}
                                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prenom">Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                required
                                value={formData.prenom}
                                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="dateNaissance">Date de naissance</label>
                            <input
                                type="date"
                                id="dateNaissance"
                                required
                                value={formData.dateNaissance}
                                onChange={(e) => setFormData({...formData, dateNaissance: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="adresse">Adresse</label>
                            <input
                                type="text"
                                id="adresse"
                                required
                                value={formData.adresse}
                                onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="codePostal">Code postal</label>
                            <input
                                type="text"
                                id="codePostal"
                                required
                                value={formData.codePostal}
                                onChange={(e) => setFormData({...formData, codePostal: e.target.value})}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="ville">Ville</label>
                            <input
                                type="text"
                                id="ville"
                                required
                                value={formData.ville}
                                onChange={(e) => setFormData({...formData, ville: e.target.value})}
                            />
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Création...' : 'Créer le client'}
                    </button>
                </form>
            )}
        </div>
    );
};