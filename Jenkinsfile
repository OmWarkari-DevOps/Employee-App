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
                git '
    }
}