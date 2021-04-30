pipeline {
  agent any
  stages {
    stage('initialize') {
      steps {
        echo 'initialization phase'
        sh 'npm install'
      }
    }

    stage('diagnostics') {
      when {
         branch pattern: 'jenkins-test', comparator: "REGEXP"
      }
      steps {
        echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
        pwd
        ls
      }
    }

    stage('build') {
      when { not { branch 'jenkins-test' } }
      steps {
        echo 'start build'
        sh 'npm run build'
      }
    }

    stage('test') {
      steps {
        echo 'begin test suite'
      }
    }

    stage('deploy') {
      steps {
        sh 'pwd; ls;'
      }
    }

  }
}
