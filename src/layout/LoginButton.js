import React from 'react';
import { Login } from '../Helpers';
import { AppContext } from '../App';

const handleLoginChange = () => {
  Login();
};

const LoginButton = props => {
  const [appState, dispatch] = React.useContext(AppContext);

  return (
    <button 
      className="login" 
      onClick={handleLoginChange} 
      >Log {appState.email ? 'Out' : 'In'}
    </button>
  );
};

export const LoginGroup = props => {
  const [appState, dispatch] = React.useContext(AppContext);

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