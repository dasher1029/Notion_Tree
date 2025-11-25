pipeline {
    agent any

    environment {
        IMAGE_NAME = "notion-tree"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/dasher1029/Notion_Tree.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:latest", ".")
                }
            }
        }

        stage('Login & Push to DockerHub') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-hub',
                                     usernameVariable: 'DOCKER_USER',
                                     passwordVariable: 'DOCKER_PASS')
                ]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag ${IMAGE_NAME}:latest $DOCKER_USER/${IMAGE_NAME}:latest
                        docker push $DOCKER_USER/${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Docker image build & push 성공"
        }
        failure {
            echo "❌ Pipeline 실패 — 로그 확인 필요"
        }
    }
}