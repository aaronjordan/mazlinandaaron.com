import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import LoginButton from './LoginButton'; 

export const RequireLogin = () => {
  return (
    <section className="login-guard">
      <p className="even-margin lead">Please log in to view this content.</p>
      <LoginButton />
      <p className="even-margin" id="disclaimer">We will recieve and use your name and email address to identify you on this site if you choose to log in. Logging in acknowledges acceptance of our <Link to="/privacy-policy">Privacy Policy <FontAwesomeIcon id="privacy-link" icon={faExternalLinkAlt} size="sm"/></Link></p>
    </section>
  );
};

export default RequireLogin;