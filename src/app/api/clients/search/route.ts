import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q')?.toLowerCase() || '';

        const clients = await prisma.client.findMany({
            where: {
                OR: [
                    { nom: { contains: query, mode: 'insensitive' } },
                    { prenom: { contains: query, mode: 'insensitive' } },
                    { ville: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            status: 'success',
            data: clients
        });

    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'Une erreur est survenue lors de la recherche'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log("start");
        console.log(request);
        console.log(body);

        const client = await prisma.client.create({
            data: {
                nom: body.nom,
                prenom: body.prenom,
                dateNaissance: new Date(body.dateNaissance),
                adresse: body.adresse,
                codePostal: body.codePostal,
                ville: body.ville,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        console.log("Done");

        return NextResponse.json({
            status: 'success',
            data: client
        });

    } catch (error) {

        console.log(error);
        return NextResponse.json(
            {
                status: 'error',
                message: 'Une erreur est survenue lors de la création du client'
            },
            { status: 500 }
        );
    }
}
