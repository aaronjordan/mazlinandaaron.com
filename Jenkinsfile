pipeline {
  agent any
  stages {
    stage('initialize') {
      when { not { branch 'jenkins-testing' } }
      steps {
        echo 'initialization phase'
        sh 'npm install'
      }
    }

    stage('diagnostics') {
      when {
         branch pattern: '^jenkins.*', comparator: "REGEXP"
      }
      steps {
        echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
        echo "To the moon!"
        sh 'pwd'
        sh 'ls'
      }
    }

    stage('build') {
      when { not { branch 'jenkins-testing' } }
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
