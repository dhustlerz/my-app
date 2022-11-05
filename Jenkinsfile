pipeline {
    agent any
    options {
        timeout(time: 15, unit: 'MINUTES')
    }
    stages {

        // Build the code
        stage('npm get dependencies') {
            steps {
               sh 'cd app && npm install'
            }
        }
        // Run unit test
        stage('Run Unit Test') {
            steps {
               sh 'pwd'
               sh 'ls -l'
               sh 'cd app && npm test'
            }
        }
        // Run unit test
        stage('build Docker Container') {
            steps {
              sh 'docker build -t ibt-student .'
              sh 'docker tag ibt-student:latest 630437092685.dkr.ecr.us-east-2.amazonaws.com/ibt-student:latest'
            }
        }
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
}