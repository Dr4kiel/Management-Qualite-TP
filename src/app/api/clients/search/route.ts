import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get('q')?.toLowerCase() ?? '';

        const clients = await prisma.client.findMany({
            where: {
                OR: [
                    {nom: {contains: query, mode: 'insensitive'}},
                    {prenom: {contains: query, mode: 'insensitive'}},
                    {ville: {contains: query, mode: 'insensitive'}},
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
        throw error;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

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

        return NextResponse.json({
            status: 'success',
            data: client
        });

    } catch (error) {
        throw error;
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const {id, ...data} = body;

        const client = await prisma.client.update({
            where: {id},
            data: {
                ...data,
                dateNaissance: new Date(data.dateNaissance),
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({
            status: 'success',
            data: client
        });
    } catch (error) {
        throw error;
    }
}

export async function DELETE(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                {status: 'error', message: 'ID manquant'},
                {status: 400}
            );
        }

        await prisma.client.delete({
            where: {id: Number(id)},
        });

        return NextResponse.json({status: 'success'});
    } catch (error) {
        throw error;
    }
}
