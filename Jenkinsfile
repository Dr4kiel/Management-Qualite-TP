pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Test') {
            steps {
                sh 'docker-compose run --rm web npm run test'
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