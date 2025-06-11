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
        // stage('Lint') {
        //     steps {
        //         sh 'docker-compose run --rm web npm run lint'
        //     }
        // }
        stage('Unit Tests') {
            steps {
                sh 'docker-compose exec -T web npm run test -- --coverage'
            }
        }
        stage('Integration Tests') {
            steps {
                // Ajoutez ici vos tests d'intégration si besoin
                sh 'echo "Integration tests placeholder"'
            }
        }
        // stage('SonarQube Analysis') {
        //     steps {
        //         // Remplacez par la commande SonarQube adaptée à votre configuration
        //         sh 'docker-compose exec -T web npx sonar-scanner'
        //     }
        // }
        stage('OWASP Dependency-Check') {
            steps {
                dependencyCheck additionalArguments: '', 
                                odcInstallation: 'Default', // ou le nom de l'installation configurée dans Jenkins
                                scanpath: '.', 
                                outdir: 'owasp-report', 
                                failBuildOnCVSS: '7', // seuil de blocage, optionnel
                                datadir: ''
                // Publication du rapport HTML
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