//head
pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'DockerHub-Cred'
        DOCKERHUB_REPO = 'ziyadtarek99/flappy-bird-game'
        // IMAGE_TAG = 'latest' // Removed comment
    }

    stages {
        stage('Build Docker Image') {
            steps {
                dir('App') { // Change to the directory containing the Dockerfile
                    script {
                        // Calculate the new tag (increment by 0.1)
                        def newTag = "0.${env.BUILD_NUMBER}"
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
                    }
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                script {
                    // Increment the image tag
                    def newTag = "0.${env.BUILD_NUMBER}"

                    // Update the image tag in Kubernetes deployment file
                    sh """
                    sed -i "s|image:.*|image: ${DOCKERHUB_REPO}:${IMAGE_TAG}|" k8s/deployment.yaml
                    """

                    // Update the image tag in Helm values.yaml
                    sh """
                    sed -i "s/tag:.*/tag: \"$newTag\"/" flappy-bird/values.yaml
                    """
                }
            }
        }

        stage('Deploy with Helm') {
            steps {
                script {
                    withEnv(['KUBECONFIG=/home/ziad/.kube/config']) {
                        script {
                            sh 'helm upgrade --install flappy-bird-release flappy-bird-0.1.0.tgz --namespace default --values flappy-bird/values.yaml'

                        }


                    }
                   
                }
            }
        }
    }
}


stage('Deploy with Helm') {
    steps {
        withEnv(['KUBECONFIG=/home/ziad/.kube/config']) {
            script {
                
            }
        }
    }
}
