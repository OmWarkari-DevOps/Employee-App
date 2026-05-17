pipeline {

    agent any

    environment {
        APP_NAME = "employee-management-system"
        CONTAINER_NAME = "employee-app-container"
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        DOCKERHUB_USERNAME = "omwarkri123"
        IMAGE_TAG = "1.0"

    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/OmWarkari-DevOps/Employee-App.git'
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
                sh 'docker compose version || docker-compose --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $APP_NAME .
                '''
            }
        }
         stage('Docker Login') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {

            sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            '''
        }
    }
}

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker compose down || docker-compose down || true
                '''
            }
        }
        stage('docker tag') {
            steps {
                sh '''
                docker tag $APP_NAME:latest omwarkri123/$APP_NAME:1.0
                '''

            }
        }
        stage('docker push') {
            steps {
                sh '''
                docker push omwarkri123/$APP_NAME:1.0
                '''

            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                docker compose up -d --build || docker-compose up -d --build
                '''
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
        

        stage('Application Health Check') {
            steps {
                sh '''
                sleep 10
                curl -I http://localhost:8000
                '''
            }
        }
    }

    post {

        success {
            echo 'Employee Management System deployed successfully!'
        }

        failure {
            echo 'Deployment failed!'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}