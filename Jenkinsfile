pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        cleanWs()
        checkout([$class: 'GitSCM',
          branches: [
            [name: '*/main']
          ],
          doGenerateSubmoduleConfigurations: false,
          extensions: [
            [$class: 'RelativeTargetDirectory', relativeTargetDir: 'repo'
            ]
          ],
          submoduleCfg: [],
          userRemoteConfigs: [
            [url: 'https://github.com/aleksbelic/what-is-it-api.git']
          ]
        ])
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'cd repo && npm install'
        sh 'cd repo && npx playwright install' // install browsers
      }
    }
    stage('Start app') {
      steps {
        sh 'cd repo && npm run build && npm start &'
        sleep 60
      }
    }
    stage('Run tests') {
      steps {
        sh 'cd repo && npm run e2e'
      }
    }
  }
}