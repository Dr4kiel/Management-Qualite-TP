# Projet Management Qualité
## Présentation

Ce projet est une application web développée avec Next.js et PostgreSQL dans le cadre du cours de Management de la Qualité. Il a pour objectif de mettre en pratique les concepts de gestion de la qualité à travers le développement d'une application moderne, robuste et maintenable.

## Architecture du projet

Ce projet utilise Docker pour containeriser et faciliter le déploiement de l'application. L'architecture se compose principalement de trois éléments :
- **Frontend** : développé avec Next.js pour offrir une interface utilisateur réactive.
- **Backend** : géré par Next.js API routes et connecté à une base de données PostgreSQL.
- **Base de données** : PostgreSQL, orchestrée via Docker pour simplifier la gestion et l'intégration.

L'ensemble du projet est orchestré à l'aide de fichiers de configuration Docker, permettant une mise en place rapide et reproductible de l'environnement de développement et de production.

## Utilisation de Jenkins

### Pré-Requis

- Avoir un fichier `jenkins/jenkins.env` avec `GITHUB_TOKEN` pour l'accès au dépôt.

### Utilisation avec docker-compose

Pour lancer le conteneur Docker avec l'application, il suffit de lancer le profil :
```sh
docker-compose --profile jenkins up
```