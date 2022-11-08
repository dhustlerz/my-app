pipeline {
    agent any
    options {
        timeout(time: 15, unit: 'MINUTES')
    }
    stages {

        stage('npm get dependencies') {
            steps {
               sh 'cd app && npm install'
            }
        }
        stage('Run Unit Test') {
            steps {
               sh 'cd app && npm test'
            }
        }
        stage('build Docker Container') {
            steps {
                script {
                    // build image
                    docker.build("630437092685.dkr.ecr.us-east-2.amazonaws.com/ibt-student:latest")
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script{
                    //https://<AwsAccountNumber>.dkr.ecr.<region>.amazonaws.com/ibt-student', 'ecr:<region>:<credentialsId>
                    docker.withRegistry('https://630437092685.dkr.ecr.us-east-2.amazonaws.com/ibt-student', 'ecr:us-east-2:ibt-ecr') {
                    // build image
                    def myImage = docker.build("630437092685.dkr.ecr.us-east-2.amazonaws.com/ibt-student:latest")
                    // push image
                    myImage.push()
                    }
                }
            }
        }
        stage('Trivy Scan') {
            steps {
                sh 'trivy image --format template --template \"/var/lib/jenkins/trivy_tmp/html.tpl\" --output trivy_report.html 630437092685.dkr.ecr.us-east-2.amazonaws.com/ibt-student:latest'
            }
        }
//         stage('Deploy to DEV') {
//             steps {
//                 ansiblePlaybook(
//                     playbook: 'ansible/deploy-docker.yaml',
//                     inventory: 'ansible/hosts',
//                     credentialsId: 'vm-ssh',
//                     colorized: true,
//                     extraVars: [
//                         "myHosts" : "devServer",
//                         "artifact": "${WORKSPACE}/target/hello-maven-1.0-SNAPSHOT.war"
//                     ]
//                 )
//             }
//         }
//         // run sonarqube test
//         stage('Run Sonarqube') {
//             environment {
//                 scannerHome = tool 'ibt-sonarqube';
//             }
//             steps {
//               withSonarQubeEnv(credentialsId: 'SQ-student', installationName: 'IBT sonarqube') {
//                 sh "${scannerHome}/bin/sonar-scanner"
//               }
//             }
//         }
//         // Dependency check
//         stage('Run Dependency check') {
//             steps {
//                 dependencyCheck additionalArguments: '''
//                     -o "./"
//                     -s "./"
//                     -f "ALL"
//                     --prettyPrint''', odcInstallation: 'dependency-check'
//
//                 dependencyCheckPublisher pattern: 'dependency-check-report.xml'
//             }
//         }
//         // push the code to jfrog
//         stage('Push to Artifactory (Jfrog)') {
//             steps{
//                 configFileProvider([configFile(fileId: '5d0920bc-97c5-4877-8aa4-2f61975fa9fc', variable: 'MAVEN_SETTINGS_XML')]) {
//                     sh 'mvn -U --batch-mode -s $MAVEN_SETTINGS_XML clean deploy'
//                 }
//             }
//         }
//         stage('Configure our VM(s)') {
//             steps {
//                 catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
//                     ansiblePlaybook(
//                         playbook: 'ansible/tomcat.yaml',
//                         inventory: 'ansible/hosts',
//                         credentialsId: 'vm-ssh',
//                         colorized: true
//                     )
//                 }
//             }
//         }
//         stage('Deploy to DEV') {
//             steps {
//                 ansiblePlaybook(
//                     playbook: 'ansible/deploy-war.yaml',
//                     inventory: 'ansible/hosts',
//                     credentialsId: 'vm-ssh',
//                     colorized: true,
//                     extraVars: [
//                         "myHosts" : "devServer",
//                         "artifact": "${WORKSPACE}/target/hello-maven-1.0-SNAPSHOT.war"
//                     ]
//                 )
//             }
//         }
//         stage('Approval to Deploy to PROD') {
//             steps{
//                 input message: 'Ready to Deploy to Prod',
//                       submitter: 'ibt-admin, ooghenekaro'
//             }
//         }
//         stage('Deploy to PROD') {
//             steps {
//                 ansiblePlaybook(
//                     playbook: 'ansible/deploy-war.yaml',
//                     inventory: 'ansible/hosts',
//                     credentialsId: 'vm-ssh',
//                     colorized: true,
//                     extraVars: [
//                         "myHosts" : "prodServer",
//                         "artifact": "${WORKSPACE}/target/hello-maven-1.0-SNAPSHOT.war"
//                     ]
//                 )
//             }
//         }
    }
    post {
        always {
            archiveArtifacts artifacts: "trivy_report.html", fingerprint: true

            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'trivy_report.html',
                reportName: 'Trivy Scan',
                ])
            }
        }
}
