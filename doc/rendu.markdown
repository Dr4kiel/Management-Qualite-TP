# Informations Générales

- **GAUTIER Tristan**
- **GAUDIN Cyprien**
- **2024-2025**
- **Sup De Vinci Rene - M1 DEV A**

Github: [Dr4kiel/Management-Qualite-TP](https://github.com/Dr4kiel/Management-Qualite-TP/tree/V1.1)

# Présentation des Résultats de la Démonstration

## 1. Schéma de l’Organisation Technique

Nous avons organisé notre projet en utilisant les outils suivants :
- **Git** pour la gestion de version.
- **Jenkins** pour l'intégration continue.
- **SonarQube** pour l'analyse de code.
- **Docker** pour la conteneurisation de l'application.
- **Jest** pour les tests du code.
- **PostgreSQL** comme base de données.
- **OWASP Dependency Check** pour analyser les dépendances et détecter les vulnérabilités connues.

Voici notre fichier docker-compose.yml :

```yaml
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
    networks:
      - ci-network

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
    networks:
      - ci-network

  jenkins:
    build:
      context: ./jenkins
      dockerfile: Dockerfile
    user: root
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      JAVA_OPTS: -Djenkins.install.runSetupWizard=false
    depends_on:
      - web
      - db
    env_file:
      - ./jenkins/jenkins.env
    networks:
      - ci-network
    profiles:
      - jenkins

volumes:
  postgres_data:
  jenkins_home:

networks:
  ci-network:
    driver: bridge
```

<div style="page-break-after: always;"></div>

## 2. Commentaires sur l’Organisation Technique

- **Git :**
  - Nous avons utilisé Git pour gérer le code source de notre projet, permettant une collaboration efficace entre les membres de l'équipe et un suivi des modifications. Nous avons utilisée la partie issues pour suivre les taches en cours, terminé et à faire avec un suivi de milestone.
  - Nous avons structuré notre dépôt avec des branches pour les fonctionnalités (créer depuis dev et lier à une issue), les corrections de bugs et la version principale, facilitant ainsi le développement parallèle.
  - Cela nous permet de tracer tout ce qui est fait et de remonter facilement en cas de problèmes pour résoudre rapidement les bugs.
- **Jenkins :**
  - Nous avons mis en place Jenkins pour automatiser le processus d'intégration continue, ce qui nous permet de lancer des builds et des tests automatiquement à chaque commit.
  - Jenkins est configuré pour exécuter une pipeline qui construit l'application, exécute les tests et effectue l'analyse de code avec SonarQube.
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
  - Configuration de la pipeline pour automatiser les builds, les tests et l'analyse de code.
  - Intégration de Docker pour exécuter les builds dans des conteneurs isolés.
  - Utilisation du plugin `Configuration as Code` pour créer au démarrage de Jenkins toutes les configurations nécessaires.
  - Utilisation du plugin `OWASP Dependency Check` pour analyser les dépendances du projet et détecter les vulnérabilités connues.
- **SonarQube :**
  - Analyse automatique du code à chaque commit.
  - Mise en place de règles de qualité personnalisées pour notre projet.
  - Tableau de bord pour visualiser la qualité du code et les problèmes détectés.
  - Intégration de SonarQube dans la pipeline Jenkins pour automatiser l'analyse du code.

<div align="center">
  <img src="image-2.png" alt="Schéma de la configuration" width="600"/>
</div>

### Configuration de Jenkins

#### Jenkinsfile
```groovy
pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                script {
                    if (!fileExists('jenkins/jenkins.env')) {
                        writeFile file: 'jenkins/jenkins.env', text: ''
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Start Services') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'docker-compose exec -T web npm run test -- --coverage'
            }
        }
        stage('SonarCloud Analysis') {
            steps {
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'TOKEN')]) {
                    sh 'docker-compose exec -T web npm install -g sonarqube-scanner'
                    sh '''
                        docker-compose exec -T web npx sonarqube-scanner -Dsonar.login=$TOKEN
                    '''
                }
            }
        }
        stage('OWASP Dependency-Check') {
            steps {
                dependencyCheck odcInstallation: 'Default', additionalArguments: '--format HTML --out owasp-report'
                publishHTML(target: [
                    reportDir: 'owasp-report',
                    reportFiles: 'dependency-check-report.html',
                    reportName: 'OWASP Dependency-Check Report'
                ])
            }
        }
    }
    post {
        failure {
            echo 'Le build ou les tests ont échoué.'
        }
        success {
            echo 'Le build et les tests ont réussi.'
        }
        always {
            sh 'docker-compose down -v'
            echo 'Nettoyage des conteneurs et volumes après l\'exécution.'
        }
    }
}
```

#### Dockerfile Jenkins
```dockerfile
FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io docker-compose

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY casc.yaml /var/jenkins_home/casc.yaml
ENV CASC_JENKINS_CONFIG=/var/jenkins_home/casc.yaml

USER jenkins
```
#### Configuration as Code
```yaml
jenkins:
  systemMessage: "Jenkins auto-config via JCasC"
  numExecutors: 2

  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: admin
          password: admin

  authorizationStrategy:
    loggedInUsersCanDoAnything:
      allowAnonymousRead: false

  globalNodeProperties:
    - envVars:
        env:
          - key: "NVD_API_KEY"
            value: "${NVD_API_KEY}"

unclassified:
  location:
    adminAddress: "admin@example.com"
    url: "http://jenkins:8080/"
  
  sonarGlobalConfiguration:
    buildWrapperEnabled: false
    installations:
    - credentialsId: "SONAR_TOKEN"
      name: "Default"
      serverUrl: "https://sonarcloud.io/"
      triggers:
        skipScmCause: false
        skipUpstreamCause: false

credentials:
  system:
    domainCredentials:
      - credentials:
          - string:
              id: "github-token"
              description: "GitHub Token"
              secret: "${GITHUB_TOKEN}"
          - string:
              id: "SONAR_TOKEN"
              description: "SonarQube Token"
              secret: "${SONAR_TOKEN}"

jobs:
  - script: >
      pipelineJob('nextjs-ci') {
        definition {
          cpsScm {
            scm {
              git {
                remote {
                  url('https://github.com/Dr4kiel/Management-Qualite-TP.git')
                 }
                    branches('*/main', '*/develop')
                 }
            }
            scriptPath('Jenkinsfile')
          }
          triggers {
            scm('H/5 * * * *')
            githubPush()
          }
        }
      }

tool:
  dependency-check:
    installations:
    - name: "Default"
      properties:
      - installSource:
          installers:
          - dependencyCheckInstaller:
              id: "12.1.3"
              
  sonarRunnerInstallation:
    installations:
    - name: "Default"
      properties:
      - installSource:
          installers:
          - sonarRunnerInstaller:
              id: "7.1.0.4889"
```

## 4. Tests

### Tests Unitaires


#### Front-end
Pour le front-end, nous avons mis en place des tests unitaires avec Jest et React Testing Library, principalement focalisés sur :

- Les composants React isolés
- Les fonctions utilitaires
- La validation des formulaires
- Le rendu conditionnel des éléments
- Les interactions utilisateur basiques

```typescript
// Exemple de test d'un composant
describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### Back-end
Pour la partie back-end, les tests n'ont pas encore été implémentés car nous devons mettre en place une base de données de test séparée. Cela permettra d'éviter toute interférence avec la base de données de production. Cette séparation est cruciale pour :

- Garantir l'intégrité des données de production
- Permettre des tests destructifs sans impact
- Assurer la reproductibilité des tests
- Faciliter le développement en équipe sans conflit de données
- Permettre des tests de performance et de charge sans affecter l'environnement de production
- Assurer une isolation des tests pour une meilleure détection des bugs
- Permettre des tests de migration de base de données sans risque

La mise en place d'une base de données de test est planifiée pour la prochaine itération du projet.

### Résultats des Tests

<div align="center">
  <img src="image-3.png" alt="Résultats Test" width="800"/>
</div>
- Sur cette image nous pouvons voir que tous les test front-end sont passés avec succès, ce qui indique que les composants fonctionnent comme prévu.
- Ces test sont à executés lors d'une modification d'un composant pour vérifier que le composants n'a pas été cassé par la modification et ainsi ne pas avoir de régression.
- On peut voir que notre poucentage de couverture est de 76.8% ce qui est un bon score pour un projet de cette taille. Cependant, nous visons à atteindre 80% de couverture dans les prochaines itérations.


## 5. Scénarios de Détection de Bugs

### Résultats avec SonarQube
<div align="center">
  <img src="image.png" alt="Résultats SonarQube" width="800"/>
</div>

- On a pu détecter plusieurs bugs et vulnérabilités dans notre code grâce à SonarQube (+ 1000 problèmes) classés par niveau de sévérité (blocage, critique, majeur, mineur).
- Après analyse, nous avons remarqué que la grande majortié des problèmes étaient à cause du rapport OWASP. Les problèmes restants ont été corrigés en suivant les recommandations de SonarQube.

<div align="center">
  <img src="image-1.png" alt="Nombre de problèmes SonarQube" width="400"/>
</div>

### Résultats avec OWASP

<div align="center">
  <img src="image-4.png" alt="Résultats OWASP" width="800"/>
</div>

- Nous avons utilisé OWASP Dependency Check pour analyser les dépendances de notre projet et détecter les vulnérabilités connues.
- OWASP n'a pas détecte de vulnérabilités dans nos dépendances, ce qui est un bon signe de la qualité de notre gestion des dépendances.

  
## 6. Résultats

- Les tests unitaires front-end ont été réussis à 100%, ce qui indique que les composants fonctionnent comme prévu.
- La configuration de Jenkins a été mise en place avec succès, permettant l'automatisation des builds, des tests et de l'analyse de code.
- SonarQube a détecté un grand nombre de problèmes dans le code, mais la majorité étaient liés au rapport généré d'OWASP. Le reste des problèmes ont été corrigés.
- L'intégration de SonarQube et OWASP Dependency Check dans la pipeline Jenkins a été réussie, permettant une analyse continue de la qualité du code et des dépendances.

## 7. Axes d’Amélioration

- Faire les test sur la partie back-end.
- Améliorer la couverture des tests unitaires pour atteindre 80%.
- Mettre en place un serveur Jenkins et SonarQube pour, à la fois alléger le projet, mais également de sorte à pouvoir réutiliser ces outils pour de futurs projets.

## 8. Conclusion

- Les outils mis en place (Git, Jenkins, SonarQube, Docker, OWASP) ont permis d'automatiser le processus de développement et de garantir la qualité du code. Mais nous avons rencontrés quelques difficultés à mettre en place SonarQube et OWASP dans Jenkins.
- Il est primordial de fixer des objectifs de qualité et de sécurité dès le début du projet pour éviter les problèmes à long terme. Ce type de mise en place est à conserver pour les futurs projets.