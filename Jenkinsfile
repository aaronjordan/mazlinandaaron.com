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
      when { branch 'jenkins-testing' }
      steps {
        echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
        echo 'running a diagnostic'
        echo 'pwd writes'
        sh 'pwd'
        echo 'ls writes'
        sh 'ls'
        echo "can access env var: ${TEST_VARIABLE}";
        sh "echo ${TEST_VARIABLE}"
        sh "echo 'production: ${DIR_PROD_MA_COM}'"
        sh "echo 'staging: ${DIR_STAGE_MA_COM}'"
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
            sh "rm -r -v ${DIR_PROD_MA_COM}*"
            sh "mv -v build/* ${DIR_PROD_MA_COM}"
          }
        }
        stage('deploy-staging') {
          when { branch 'stage' }
          steps {
            echo 'deploy to staging'
            sh "rm -r -v ${DIR_STAGE_MA_COM}*"
            sh "mv -v build/* ${DIR_STAGE_MA_COM}"
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
