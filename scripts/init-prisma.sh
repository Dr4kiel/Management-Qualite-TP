#!/bin/sh

# Attendre que la base de données soit prête
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  echo "Database is not ready yet. Retrying in 2 seconds..."
  sleep 2
done

echo "Database is ready!"

# Exécuter les commandes Prisma
npx prisma migrate dev --name init