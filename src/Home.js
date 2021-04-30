import React from 'react';
import {Link} from 'react-router-dom';

import engagement from './img/engagement1.jpg'
import './Home.scss';

export const Home = () => {
  return (
    <main className="home">
      <div className="img-filter" />
      <img src={engagement} alt="Mazlin and Aaron" className="hero"/>
      <p>Head over to the <Link to="/upcoming">Upcoming tab</Link> for more infomation about what's coming on this website as well as our wedding plans.</p>
    </main>
  );
};

export default Home;