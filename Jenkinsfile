pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'DockerHub-Cred'
        DOCKERHUB_REPO = 'ziyadtarek99/flappy-bird-game'
        K8S_CRED_ID = 'myminikube-cred'
        // IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/ziyad-tarek1/flappy-bird-game.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('App') { // Change to the directory containing the Dockerfile
                    script {
                        // Calculate the new tag (increment by 1.0 for each build)
                        def newTag = "${env.BUILD_NUMBER}.0"
                        env.IMAGE_TAG = newTag
                        
                        // Build the Docker image with the new tag
                        docker.build("${DOCKERHUB_REPO}:${newTag}")
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to Docker Hub with the new tag
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKERHUB_REPO}:${IMAGE_TAG}").push()
                        
                        // Tag the image as latest and push it
                        docker.image("${DOCKERHUB_REPO}:${IMAGE_TAG}").push('latest')
                    }
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                script {
                    /* Update the image tag in Kubernetes deployment file
                    sh """
                    sed -i "s|image:.*|image: ${DOCKERHUB_REPO}:${IMAGE_TAG}|" k8s/deployment.yaml
                    """
                    */
                    // Update the image tag in Helm values.yaml
                    sh """
                    sed -i "s/tag:.*/tag: \"$IMAGE_TAG\"/" flappy-bird/values.yaml
                    """
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                withKubeConfig(credentialsId: "${env.K8S_CRED_ID}") {
                    // Apply the ArgoCD application.yaml to start the CD process
                    sh 'kubectl apply -f application.yaml'
                }
            }
        }
    }
}
