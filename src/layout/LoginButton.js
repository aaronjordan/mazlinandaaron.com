import React from 'react';
import { LoginSSO, clearCookies } from '../Helpers';
import { AppContext } from '../App';
import { LOGOUT_ACTION } from '../AppStateReducer';
import google_button from '../img/g2x.png';
import facebook_logo from '../img/f72.png'; 

const handleLogin = (provider, returnTo) => {
  LoginSSO({provider});
  sessionStorage.setItem('isGettingAuth', true);
  sessionStorage.setItem('returnTo', returnTo || '/');
  console.log(returnTo)
};

const GoogleButton = (props) => (
  <button 
    className="g-login auth"
    onClick={() => handleLogin('google', props.returnTo)}>
    <img src={google_button} alt="Sign in with Google" />
  </button>
);

const FacebookButton = (props) => (
  <button 
    className="fb-login auth"
    onClick={() => handleLogin('facebook', props.returnTo)}>
    <img src={facebook_logo} alt="Facebook logo" />
    <span>Login with Facebook</span>
  </button>
);

/**
 * Log out a user by clearing cookies and storage
 * Will then execute a provided callback function
 * @param {function} cb the post-logout callback 
 */
const handleLogout = (cb) => {
  clearCookies('login_');
  sessionStorage.clear();
  localStorage.clear();
  typeof cb === 'function' && cb();
};

const LoginButton = props => {
  const [appState, dispatch] = React.useContext(AppContext);
  const dispatchLogout = () => dispatch({type: LOGOUT_ACTION});

  if(!appState.isAuthenticated) return (
      <>
        <GoogleButton returnTo={appState.activeRoute}/>
        <FacebookButton returnTo={appState.activeRoute}/>
      </>
    );
  else return (
    <>
      <button 
        className="logout" 
        onClick={() => handleLogout(dispatchLogout)} 
        >Log Out
      </button>
    </>
  );
};

export const LoginGroup = props => {
  const [appState] = React.useContext(AppContext);

  return(
    <li className="login-group">
      <div>
        { appState.email ? `You are logged in as ${appState.email}` : "You are not logged in." }
      </div>
      <LoginButton />
    </li>
  );
};

export default LoginButton;