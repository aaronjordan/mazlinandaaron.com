import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Upcoming from './Upcoming';
import './App.scss';

function App() {
  const [isPageVisible, setIsPageVisible] = useState(false);

  window.addEventListener('load', () => setTimeout(() => setIsPageVisible(true), 800));

  return (
    <BrowserRouter>
      <div className="loading" style={{display: (isPageVisible) ? "none" : "flex" }}>
          <FontAwesomeIcon icon={faCircleNotch} size="3x"/>
      </div>
      <div className={"App " + ((isPageVisible) ? "show" : "hidden")}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/upcoming" component={Upcoming} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
