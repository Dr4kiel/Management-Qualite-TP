// src/app/api/clients/search/route.ts
import { NextResponse } from 'next/server';

// Données de test (à remplacer par votre vraie base de données)
const mockClients = [
    {
        id: 1,
        nom: "Jean Dupont",
        email: "jean.dupont@email.com",
        telephone: "01 23 45 67 89"
    },
    {
        id: 2,
        nom: "Marie Martin",
        email: "marie.martin@email.com",
        telephone: "01 98 76 54 32"
    },
    {
        id: 3,
        nom: "Pierre Durant",
        email: "pierre.durant@email.com",
        telephone: "01 45 67 89 10"
    }
];

export async function GET(request: Request) {
    try {
        // Récupérer le paramètre de recherche depuis l'URL
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q')?.toLowerCase() || '';

        // Filtrer les clients selon la recherche
        const filteredClients = mockClients.filter(client =>
            client.nom.toLowerCase().includes(query) ||
            client.email.toLowerCase().includes(query) ||
            client.telephone.includes(query)
        );

        // Simuler un délai de réseau (optionnel)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Retourner les résultats
        return NextResponse.json({
            status: 'success',
            data: filteredClients
        });

    } catch (error) {
        // Gérer les erreurs
        return NextResponse.json(
            {
                status: 'error',
                message: 'Une erreur est survenue lors de la recherche'
            },
            { status: 500 }
        );
    }
}

// Gérer les requêtes POST si nécessaire
export async function POST(request: Request) {
    try {
        const body = await request.json();

        return NextResponse.json({
            status: 'success',
            message: 'POST request received',
            data: body
        });

    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'Une erreur est survenue lors du traitement de la requête'
            },
            { status: 500 }
        );
    }
}