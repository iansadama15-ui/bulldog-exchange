
pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'RUN_DEPLOY',
            defaultValue: false,
            description: 'Deploy after successful tests and build'
        )

        booleanParam(
            name: 'ROLLBACK',
            defaultValue: false,
            description: 'Redeploy a previously built image version'
        )

        string(
            name: 'ROLLBACK_TAG',
            defaultValue: 'baseline',
            description: 'Existing image tag to restore'
        )
    }

    environment {
        COMPOSE_PROJECT_NAME = 'bulldog-exchange-cicd'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            when {
                expression { !params.ROLLBACK }
            }
            steps {
                sh 'docker build --target test -t bulldog-catalog-test ./catalog-api'
                sh 'docker build --target test -t bulldog-order-test ./order-api'
            }
        }

        stage('Build Images') {
            when {
                expression { !params.ROLLBACK }
            }
            steps {
                sh '''
                    export IMAGE_TAG=build-${BUILD_NUMBER}
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            when {
                expression { params.RUN_DEPLOY || params.ROLLBACK }
            }
            steps {
                script {
                    def selectedTag = params.ROLLBACK
                        ? params.ROLLBACK_TAG.trim()
                        : "build-${env.BUILD_NUMBER}"

                    if (!(selectedTag ==~ /^[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,127}$/)) {
                        error('Invalid image tag')
                    }

                    withEnv(["IMAGE_TAG=${selectedTag}"]) {
                        sh 'docker compose up -d --no-build --remove-orphans'
                    }
                }
            }
        }

        stage('Smoke Test') {
            when {
                expression { params.RUN_DEPLOY || params.ROLLBACK }
            }
            steps {
                sh '''
                    set -e

                    for i in $(seq 1 12); do
                        if docker compose exec -T catalog-api wget -qO- http://localhost:5000/health; then
                            break
                        fi

                        if [ "$i" -eq 12 ]; then
                            echo "Catalog API health check failed"
                            exit 1
                        fi

                        sleep 5
                    done

                    for i in $(seq 1 12); do
                        if docker compose exec -T order-api wget -qO- http://localhost:3000/health; then
                            break
                        fi

                        if [ "$i" -eq 12 ]; then
                            echo "Order API health check failed"
                            exit 1
                        fi

                        sleep 5
                    done
                '''
            }
        }
    }
}
