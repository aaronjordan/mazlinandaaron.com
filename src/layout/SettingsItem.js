import React from 'react';
// import { AppContext } from '../App';

/**
 * This should become a selection of basic settings items that read/write to localstorage with user preferences
 * Might also provide a cookie settings link
 */
const SettingsItem = props => {
  // this will be needed later
  // const [appState, dispatch] = React.useContext(AppContext);

  switch (props.type) {
    case 'theme':
      return <li># Dark Mode</li>; // sun/moon
    case 'cookie':
      return <li>Cookie Settings #</li>; // arrow out
    default:
  }

  return <li>Unsupported settings type.</li>;
};

export default SettingsItem;