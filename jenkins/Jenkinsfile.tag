pipeline {
    agent any

    environment {
        // Use TAG_NAME if available (Multibranch), else GIT_COMMIT
        TAG = "${env.TAG_NAME ?: env.GIT_COMMIT}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                script {
                    bat 'docker version'
                    echo "Building for tag: ${TAG}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat "docker build -t power_gym:${TAG} ."
                }
            }
        }

        stage('Run (Docker)') {
            steps {
                script {
                    bat 'docker rm -f power_gym-tag || exit 0'
                    bat "docker run -d --name power_gym-tag -p 3003:80 power_gym:${TAG}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    sleep(time: 10, unit: "SECONDS")
                    bat 'scripts\\smoke.bat http://localhost:3003'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                script {
                    // Save Docker image as artifact
                    bat "docker image save power_gym:${TAG} -o power_gym-${TAG}.tar"
                }
                archiveArtifacts artifacts: "power_gym-${TAG}.tar, smoke_result.txt", fingerprint: true
            }
        }
    }

    post {
        always {
            bat 'docker rm -f power_gym-tag || exit 0'
        }
        cleanup {
            cleanWs()
        }
    }
}
