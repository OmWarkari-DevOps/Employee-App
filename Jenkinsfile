pipeline {

    agent any

    environment {
        APP_NAME = "employee-management-system"
        CONTAINER_NAME = "employee-app-container"
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
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
                url: 'https://github.com/your-username/Employee-app.git'
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

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker compose down || docker-compose down || true
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