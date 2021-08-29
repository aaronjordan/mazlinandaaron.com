import React, {useState, useReducer, useCallback} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { AppStateReducer, AppStateInit } from './AppStateReducer';
import ImageLoader from './ImageLoader';
import Settings from './Settings';
import Header from './Header';
import Footer from './Footer';
import Home from './routes/Home';
import Upcoming from './routes/Upcoming';
import Rsvp from './routes/RSVP';
import Visiting from './routes/Visiting';
import Registry from './routes/Registry';
import Livestream from './routes/Livestream';
import Party from './routes/Party';
import Photos from './routes/Photos';
import Privacy from './routes/Privacy';
import AdminPanel from './routes/AdminHub';
import './App.scss';

export const AppContext = React.createContext(null);
export const ImageContext = React.createContext(null);

function App() {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const makePageVisible = useCallback(() => setIsPageVisible(true), [setIsPageVisible]);
  const appState = useReducer(AppStateReducer, AppStateInit());
  const imageState = useState({});

  setTimeout(() => makePageVisible(), 8000); // make page visible after 8s even if image are loading

  return (
    <BrowserRouter>
      <div className="loading" style={{display: (isPageVisible) ? "none" : "flex" }}>
          <FontAwesomeIcon icon={faCircleNotch} size="3x"/>
      </div>
      <ImageLoader library={imageState} onInitialLoadComplete={makePageVisible}/>
      <AppContext.Provider value={appState}>
        <div className={"App " + ((isPageVisible) ? "show" : "hidden")}>
          <Settings />
          <Header />
          <ImageContext.Provider value={imageState[0]}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/upcoming" component={Upcoming} />
            {/*
            <Route path="/rsvp" component={Rsvp} />
            <Route path="/visiting-htx" component={Visiting} />
            <Route path="/registry" component={Registry} />
            */}
            <Route path="/livestream" component={Livestream} />
            <Route path="/wedding-party" component={Party} />
            <Route path="/photos" component={Photos} />
            <Route path="/privacy-policy" component={Privacy} />
            <Route exact path="/admin-panel" component={AdminPanel} />
          </Switch>
          </ImageContext.Provider>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
