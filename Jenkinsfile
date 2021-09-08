pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        registry = "kappajerem/todo"
        registryCredential = '****'
        dockerImage = ''
        CI = 'true'
    }
    stages {
        stage('Cloning Git') {
            steps {
                git 'https://github.com/oromojunior/DemoAppSec'
                }
        }
        stage('Build and start the docker images') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
        stage ('OWASP Dependency-Check Vulnerabilities') {
            steps {
                // Run OWASP Dependency Check
                dependencyCheck additionalArguments: ''' 
                    -o "./" 
                    -s "./"
                    -f "ALL" 
                    --prettyPrint''', odcInstallation: 'OWASP-DC'

                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }     
        stage('Testing the image') {
            steps {
                sh 'docker-compose -p tests run -p 3000 --rm web npm run watch-tests'
            }
        }
        stage ('NodeJsScan Analysis') {
            steps {
                // Run SAST with NodeJsScan
                sh 'nodejsscan --directory `pwd` --output /{JENKINS HOME DIRECTORY}/reports/nodejsscan-report'
            }
        }
        stage('Generating reports') {
            steps {
                sh 'docker-compose -p tests run -p 3000 --rm web npm run coverage'
            }
        }
        stage('Push to registry for Master branch alone') {
            when {
                branch 'master'
            }
            steps {
                sh 'docker-compose push'
            }
        }
    }
    post {
    }
}