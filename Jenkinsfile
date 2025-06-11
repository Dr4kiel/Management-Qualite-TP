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
        // stage('Build') {
        //     steps {
        //         sh 'docker-compose build'
        //     }
        // }
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
    }
}