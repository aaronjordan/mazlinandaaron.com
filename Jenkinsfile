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
        echo 'running a diagnostic'
        echo 'pwd writes'
        pwd
        echo 'ls writes'
        ls
        echo "can access env var: ${TEST_VARIABLE}";
        sh "echo ${TEST_VARIABLE}"
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
          when { branch 'prod' }
          steps {
            echo 'deploy to production'
          }
        }
        stage('deploy-staging') {
          when { branch 'stage' }
          steps {
            echo 'deploy to staging'
          }
        }
        stage('test-branching') {
          when { branch 'jenkins-testing' }
          steps {
            echo 'deploy to nowhere please'
          }
        }
      }
    }

  }
}
