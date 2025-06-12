# Projet Management Qualité
## Présentation

Ce projet est une application web développée avec Next.js et PostgreSQL dans le cadre du cours de Management de la Qualité. Il a pour objectif de mettre en pratique les concepts de gestion de la qualité à travers le développement d'une application moderne, robuste et maintenable en utilisant des outils de CI / CD tels que Jenkins et des outils d'analyse de code et de dépendances comme SonarQube et OWASP.

## Architecture du projet

Ce projet utilise Docker pour containeriser et faciliter le déploiement de l'application. L'architecture se compose principalement de trois éléments :
- **Frontend** : développé avec Next.js pour offrir une interface utilisateur réactive.
- **Backend** : géré par Next.js API routes et connecté à une base de données PostgreSQL.
- **Base de données** : PostgreSQL, orchestrée via Docker pour simplifier la gestion et l'intégration.

L'ensemble du projet est orchestré à l'aide de fichiers de configuration Docker, permettant une mise en place rapide et reproductible de l'environnement de développement et de production.

## Nomenclature Github

### Branches

- `main` : branche principale, stable, utilisée pour les déploiements en production.
- `develop` : branche de développement, intégration des nouvelles fonctionnalités et corrections de bugs.
- `xx-nom-du-ticket` : branches de fonctionnalités ou de corrections spécifiques, où `xx` est le numéro du ticket associé.

### Pull Requests

Les Pull Requests doivent être créées à partir de la branche `develop` vers `main` pour les déploiements en production. Les features doivent être développées dans des branches spécifiques (`xx-nom-du-ticket`) et fusionnées dans `develop` une fois terminées.

## Utilisation de Jenkins

### Pré-Requis

- Avoir un fichier `jenkins/jenkins.env` avec : 
    - `GITHUB_TOKEN` pour l'accès au dépôt.
    - `SONAR_TOKEN` pour l'analyse SonarQube.

### Utilisation avec docker-compose

Pour lancer le conteneur Docker avec l'application + Jenkins, il suffit de lancer le profil :
```sh
docker-compose --profile jenkins up
```

## Auteurs

- **Tristan GAUTIER** - tristangautier2003@gmail.com - [https://github.com/Dr4kiel]
- **Cyprien GAUDIN** - cyprien.gaudin@supdevinci-edu.fr - [https://github.com/Cyprideux53000]