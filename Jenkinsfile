pipeline {
  agent any
  stages {
    stage('initialize') {
      steps {
        echo 'initialization phase'
        sh 'npm install'
      }
    }

    stage('build') {
      when {
         branch pattern: 'jenkins-test', comparator: "REGEXP"
      }
      steps {
        echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
      }
    }

    stage('build') {
      when { not { branch 'jenkins-test' } }
      steps {
        echo 'start build'
        sh 'npm run build'
      }
    }

#    stage('test') {
#      steps {
#        echo 'begin test suite'
#        input(message: 'Should we deploy the build?', id: '1', ok: 'Yes', submitter: 'null', submitterParameter: 'null')
#      }
#    }

    stage('deploy') {
      steps {
        sh 'pwd; ls;'
      }
    }

  }
}
