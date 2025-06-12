export interface Client {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    codePostal: string;
    ville: string;
    createdAt?: string;
    updatedAt?: string;
}