pipeline {
    agent any
    stages {
        stage('Prepare') {
            steps {
                script {
                    if (!fileExists('jenkins.env')) {
                        writeFile file: 'jenkins.env', text: ''
                    }
                }
            }
        }
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
}