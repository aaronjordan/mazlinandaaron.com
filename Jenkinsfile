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
      when { branch pattern: '^jenkins.*', comparator: "REGEXP" }
      steps {
        echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh '''
          echo 'running a diagnostic'
          echo 'pwd writes'
          pwd
          echo 'ls writes'
          ls
          echo 'can access env var: ${TEST_VARIABLE}'
        '''
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
      when { anyOf { branch 'prod'; branch 'stage'; branch 'jenkins-testing' } }
      failFast true
      parallel {
        stage('deploy-production') {
          steps {
            echo 'deploy to production'
          }
        }
        stage('deploy-staging') {
          steps {
            echo 'deploy to staging'
          }
        }
        stage('test-branching') {
          steps {
            echo 'deploy to nowhere please'
          }
        }
      }
    }

  }
}
