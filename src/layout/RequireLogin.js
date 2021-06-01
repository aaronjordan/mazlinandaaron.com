import React from 'react';
import LoginButton from './LoginButton'; 

export const RequireLogin = () => {
  return (
    <section className="login-guard">
      <p className="even-margin lead">Please log in to view this content.</p>
      <LoginButton />
      <p className="even-margin" id="disclaimer">We will recieve and use your name and email address to identify you on this site if you choose to log in.</p>
    </section>
  );
};

export default RequireLogin;
