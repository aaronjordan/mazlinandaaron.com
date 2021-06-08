import React, {useState, useEffect} from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from './App';
import { LOGIN_STATE_INIT, UPDATE_LOCATION } from './AppStateReducer';
import { readCookies } from './Helpers';
// import SettingsItem from './layout/SettingsItem';
import { LoginGroup } from './layout/LoginButton';
import './Settings.scss';

const Settings = props => {
  const [appState, dispatch] = React.useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState(null);
  const currentRoute = useLocation();

  
  useEffect(() => {
    // handle redirect upon return from oauth 
    if(localStorage.getItem('isGettingAuth')) {
      localStorage.removeItem('isGettingAuth');
      
      const returnTo = localStorage.getItem('returnTo');
      localStorage.removeItem('returnTo');
      returnTo && returnTo !== '/' && setRedirectRoute(returnTo);
    }

    // read from document cookies if present
    if (document.cookie?.includes('login_email')) {
      // user is authenticated over sso
      const loginCookies = readCookies('login_');
      dispatch({
        type: LOGIN_STATE_INIT,
        payload: {
          isAuthenticated: true,
          email: loginCookies.email,
          name: loginCookies.name
        }
      });
    } else if (process.env.NODE_ENV !== 'development') {
      // user is unauthenticated
      dispatch({
        type: LOGIN_STATE_INIT,
        payload: {
          isAuthenticated: false,
          email: '',
          name: ''
        }
      });
    } else if (process.env.NODE_ENV === 'development') {
      // local
      dispatch({
        type: LOGIN_STATE_INIT,
        payload: {
          isAuthenticated: true,
          email: 'jaaronjordan@gmail.com',
          name: 'Aaron Jordan'
        }
      });

      const localLogin = require('./ENVLOCAL').CONSTANTS;
      document.cookie=`login_name=${localLogin.name}; Secure;`
      document.cookie=`login_email=${localLogin.email}; Secure;`
      document.cookie=`login_id=${localLogin.login_id}; Secure;`
    }

  }, [dispatch]);
  
  useEffect(() => console.log('%c New appstate! ', 'background-color:cyan; color: black;', appState), [appState]);

  useEffect(() => {
    !sessionStorage.getItem('isGettingAuth') && dispatch({type: UPDATE_LOCATION, payload: currentRoute.pathname});
  }, [currentRoute, dispatch]);

  return (
    <>
      <div className="settings-icon">
        <button onClick={() => setIsOpen(x => !x)}>
          <FontAwesomeIcon className={`icon ${isOpen ? 'open' : ''}`} icon={faCog} size="1x"/>
        </button>
        { isOpen &&
          <aside>
            <button className="close" onClick={() => setIsOpen(false)}>×</button>
            <h4>Settings</h4>
            <ul>
              <LoginGroup />
              <Link to="/privacy-policy">Privacy Policy <FontAwesomeIcon id="privacy-link" icon={faExternalLinkAlt} size="sm"/></Link>
            </ul>
          </aside>
        }
      </div>
      {redirectRoute && <Redirect to={redirectRoute} />} 
    </>
  );
};

export default Settings;