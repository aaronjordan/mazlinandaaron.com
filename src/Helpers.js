/**
 * A login helper function. Takes a configuration object with these fields:
 * provider<string>: the login provider to use 'google' / 'facebook'
 * 
 */
export const LoginSSO = (configuration) => {
  const config = Object.assign({
    provider: 'google',
    routeReturnTo: '',
  }, configuration);

  if(config.routeReturnTo) localStorage.setItem('return_to', config.routeReturnTo);
  
  switch (config.provider) {
    case 'google':
      window.location.href = '/api/sso/google';
      break;
    case 'facebook':
      console.warn('fb auth not set up');
      break;
    default:
      console.error('invalid SSO provider');
  }
};

/**
 * A function to determine if a string needs to be decoded with decodeURIComponent
 * @param {string} x the string to check
 */
const needsDecoding = x => decodeURI(x) !== decodeURIComponent(x) || x.includes('%20'); 

/**
 * A function to read and return an object of cookie data with specific prefixes.
 * @param {string} prefix the prefixing substring which will be used to filter which cookies to read and process
 * @returns {object} an object containing key-value pairs of parsed cookie data
 * Note that the prefix will be removed from the name of the cookie in the returned object.
 */
export const readCookies = (prefix='') => {
  const regexp = new RegExp(prefix + '(.{0,})=(.{0,})');

  const rawCookies = String(document.cookie).split(';');
  const cookieMatches = rawCookies.map(x => x.match(regexp));

  // each match will be of shape ['full match', 'short_key', 'value']
  return cookieMatches.reduce((acc, cur, idx) => {

    cur instanceof Array && cur.length === 3 && 
      Object.defineProperty(acc, cur[1], {
        value: needsDecoding(cur[2]) ? decodeURIComponent(cur[2]) : cur[2],
        enumerable: true,
      });
    return acc;

  }, {});
}