# Informations Générales

- **GAUTIER Tristan**
- **GAUDIN Cyprien**
- **2024-2025**
- **Sup De Vinci Rene - M1 DEV A**

# Présentation des Résultats de la Démonstration

## 1. Schéma de l’Organisation Technique

Nous avons organisé notre projet en utilisant les outils suivants :
- **Git** pour la gestion de version.
- **Jenkins** pour l'intégration continue.
- **SonarQube** pour l'analyse de code.
- **Docker** pour la conteneurisation de l'application.
- **Jest** pour les tests du code.

Voici notre fichier docker-compose.yml :

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: postgres://user:password@db:5432/mydatabase
    depends_on:
      - db

  db:
    image: postgres:latest
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
## 2. Commentaires sur l’Organisation Technique

- **Git :**
  - Nous avons utilisé Git pour gérer le code source de notre projet, permettant une collaboration efficace entre les membres de l'équipe et un suivi des modifications. Nous avons utilisée la partie issues pour suivre les taches en cours, terminé et à faire avec un suivi de milestone.
  - Nous avons structuré notre dépôt avec des branches pour les fonctionnalités (créer depuis dev et lier à une issue), les corrections de bugs et la version principale, facilitant ainsi le développement parallèle.
  - Cela nous permet de tracer tout ce qui est fait et de remonter facilement en cas de problèmes pour résoudre rapidement les bugs.
- **Jenkins :**
  - Nous avons mis en place Jenkins pour automatiser le processus d'intégration continue, ce qui nous permet de lancer des builds et des tests automatiquement à chaque commit.
  - Jenkins est configuré pour exécuter des pipelines qui construisent l'application, exécutent les tests et effectuent l'analyse de code avec SonarQube.
  - Jenkins est intégré à Docker afin de faciliter le déploiement et la maintenabilité du projet.
- **SonarQube :**
  - Nous avons intégré SonarQube pour analyser la qualité du code, détecter les bugs, les vulnérabilités et les mauvaises pratiques. Nous avons commencé par implémenter SonarQube dans notre projet mais sans faire attention à ses retour pour voir comment était notre code réellement.
  - Ensuite nous avons corrigé les problèmes majeurs et mis en place des règles de qualité pour maintenir un code propre et maintenable.
  - Cela nous permet donc de garder un code avec de la qualité et donc de perdre moins de temps quand on revient sur ce projet pour effectuer une modification.

## 3. Points Clés de la Configuration

- **Git :**
  - Utilisation de branches pour les fonctionnalités et corrections de bugs.
  - Suivi des tâches avec des issues et des milestones.
  - Revue de code via des pull requests pour assurer la qualité du code avant fusion.
- **Jenkins :**
  - Configuration de pipelines pour automatiser les builds et les tests.
  - Intégration avec SonarQube pour l'analyse de code après chaque build.
  - Notifications en cas d'échec de build ou de tests.
- **SonarQube :**
  - Analyse automatique du code à chaque commit.
  - Mise en place de règles de qualité personnalisées pour notre projet.
  - Tableau de bord pour visualiser la qualité du code et les problèmes détectés.

## 4. Scénarios de Détection de Bugs

### Résultats avec SonarQube
-

### Scénario 2
-

## 5. Résultats

-
-
-

## 6. Axes d’Amélioration

-
-
-

## 7. Conclusions

-
-
-