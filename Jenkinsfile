pipeline {
  environment {
    // Docker Hub Image Name
    dockerimagename = "umair1987/react-frontend"
    dockerImage = ""
    
    // Credentials ID from Jenkins (Same as backend)
    registryCredential = 'dockerhub-credentials'
    kubeconfigId = 'minikube-kubeconfig'
  }
  agent any
  stages {
    stage('Build Docker Image') {
      steps{
        script {
           // Builds the image using your Dockerfile
           dockerImage = docker.build(dockerimagename)
        }
      }
    }
    
    stage('Push to Docker Hub') {
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }
    
    stage('Deploy to Kubernetes') {
      steps {
        // Uses the Minikube config you uploaded earlier
        withKubeConfig([credentialsId: kubeconfigId]) {
           sh 'kubectl apply -f deployment.yaml'
           sh 'kubectl apply -f service.yaml'
        }
      }
    }
  }
}