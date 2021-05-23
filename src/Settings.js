import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import SettingsItem from './layout/SettingsItem';
import { LoginGroup } from './layout/LoginButton';
import './Settings.scss';

const Settings = props => {
  const [isOpen, setIsOpen] = useState(false);

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