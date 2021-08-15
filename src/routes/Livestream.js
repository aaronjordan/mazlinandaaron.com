import React from 'react';
import RequireLogin from '../layout/RequireLogin';
import { AppContext } from '../App';

import './Livestream.scss';

import './Livestream.scss';

export default function Livestream() {
  const appState = React.useContext(AppContext)[0];

  if (appState.isAuthenticated) {
    return (
      <main className="stream">
        <p>The stream is over! A replay may be made available here later.</p>
        {/*<iframe 
          className="videoContainer"
          src="https://live.mazlinandaaron.com/embed/video"
          title="Mazlin and Aaron Wedding Stream"
          referrerPolicy="origin"
          scrolling="no"
          allowFullScreen>
        </iframe>*/}
      </main>
    );
  } else {
    return <main className="login-gate"><RequireLogin /></main>;
  }
}
