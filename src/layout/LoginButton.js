import React from 'react';
import { LoginSSO, clearCookies } from '../Helpers';
import { AppContext } from '../App';
import { LOGOUT_ACTION } from '../AppStateReducer';

const handleLogin = () => {
  LoginSSO();
};

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

  return (
    <button 
      className="login" 
      onClick={!appState.isAuthenticated ? handleLogin : () => handleLogout(dispatchLogout)} 
      >Log {appState.email ? 'Out' : 'In'}
    </button>
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