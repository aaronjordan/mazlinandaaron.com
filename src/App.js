import React, {useState, useCallback} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import ImageLoader from './ImageLoader';
import Header from './Header';
import Footer from './Footer';
import Home from './routes/Home';
import Upcoming from './routes/Upcoming';
import Photos from './routes/Photos';
import './App.scss';

export const ImageContext = React.createContext(null);

function App() {
  const [isPageVisible, setIsPageVisible] = useState(false);
  const makePageVisible = useCallback(() => setIsPageVisible(true), [setIsPageVisible]);
  const imageState = useState({});

  setTimeout(() => makePageVisible(), 8000); // make page visible after 8s even if image are loading

  return (
    <BrowserRouter>
      <ImageLoader library={imageState} onInitialLoadComplete={makePageVisible}/>
      <div className="loading" style={{display: (isPageVisible) ? "none" : "flex" }}>
          <FontAwesomeIcon icon={faCircleNotch} size="3x"/>
      </div>
      <div className={"App " + ((isPageVisible) ? "show" : "hidden")}>
        <Header />
        <ImageContext.Provider value={imageState[0]}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/photos" component={Photos} />
        </Switch>
        </ImageContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
