import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from './App';
import { LOGIN_STATE_INIT } from './AppStateReducer';
import { readCookies } from './Helpers';
import SettingsItem from './layout/SettingsItem';
import { LoginGroup } from './layout/LoginButton';
import './Settings.scss';

const Settings = props => {
  const [appState, dispatch] = React.useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    // load db settings from cookie state or defaults on localhost
    // load correct route if in localStorage

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
    }

  }, [dispatch]);
  
  useEffect(() => console.log('%c New appstate! ', 'background-color:cyan; color: black;', appState), [appState]);

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
              <SettingsItem type="theme" />
              <SettingsItem type="cookie" />
            </ul>
          </aside>
        }
      </div>
    </>
  );
};

export default Settings;