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
                dependencyCheck odcInstallation: 'Default', additionalArguments: '--format HTML --out owasp-report --scan ./src/**/*.tsx --scan ./src/**/*.ts'
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