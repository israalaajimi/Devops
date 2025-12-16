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
                    sh 'docker version'
                    sh 'chmod +x ci/smoke_test.sh'
                    echo "Building for tag: ${TAG}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh "docker build -t power_gym:${TAG} ."
                }
            }
        }

        stage('Run (Docker)') {
            steps {
                script {
                    sh 'docker rm -f power_gym-tag || true'
                    sh "docker run -d --name power_gym-tag -p 3003:80 power_gym:${TAG}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    sleep(time: 10, unit: "SECONDS")
                    sh './ci/smoke_test.sh http://host.docker.internal:3003'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                script {
                    // Save Docker image as artifact
                    sh "docker image save power_gym:${TAG} -o power_gym-${TAG}.tar"
                }
                archiveArtifacts artifacts: "power_gym-${TAG}.tar, smoke_result.txt", fingerprint: true
            }
        }
    }

    post {
        always {
            sh 'docker rm -f power_gym-tag || true'
        }
        cleanup {
            cleanWs()
        }
    }
}
