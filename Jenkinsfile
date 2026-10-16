
pipeline {
    agent any

    parameters {
        booleanParam(
            name: 'RUN_DEPLOY',
            defaultValue: false,
            description: 'Enable deployment and smoke tests only when the environment is safe.'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh 'docker build --target test -t bulldog-catalog-test ./catalog-api'
                sh 'docker build --target test -t bulldog-order-test ./order-api'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            when {
                expression { params.RUN_DEPLOY == true }
            }
            steps {
                sh 'docker compose up -d --remove-orphans'
            }
        }

        stage('Smoke Test') {
            when {
                expression { params.RUN_DEPLOY == true }
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
