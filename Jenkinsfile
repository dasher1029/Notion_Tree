pipeline {
    agent any

    environment {
        IMAGE_NAME = "notion-tree"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git Checkout') {
            steps {
                git url: 'https://github.com/dasher1029/Notion_Tree.git', branch: 'main'
            }
        }

        stage('Build & Push (buildx)') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-hub',
                                     usernameVariable: 'DOCKER_USER',
                                     passwordVariable: 'DOCKER_PASS')
                ]) {
                    script {
                        sh """
                            cd ${env.WORKSPACE}
                            
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                            docker buildx create --use

                            docker buildx build \
                                --platform linux/amd64 \
                                -t $DOCKER_USER/${IMAGE_NAME}:latest \
                                . \
                                --push
                        """
                    }
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