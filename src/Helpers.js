
/**
 * A login helper function. Takes a configuration object with these fields:
 * provider<string>: the login provider to use 'google' / 'facebook'
 * 
 */
export const Login = (configuration) => {
  const config = Object.assign({
    provider: '',
    saveReturnTo: true,
  }, configuration);

  if(config.saveReturnTo) localStorage.setItem('return_to', config.saveReturnTo);
  window.location.assign('/api/sso/google');

};
