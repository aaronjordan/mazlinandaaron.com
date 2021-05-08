import {useState} from 'react';
import {Link} from 'react-router-dom';

import Title from './img/title.svg';
import plusIcon from './img/ajPlusIcon.svg';
import './Header.scss';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header>
      <h1>
        <img src={Title} className="header-title" alt="Mazlin & Aaron"/>
      </h1>
      <div className={`mobile-controls ${isNavOpen?'open':'closed'}`} >
        <div className="nav-padding" id="left"/>
        <img 
          src={plusIcon} 
          alt="expand navigation icon"
          className="nav-interaction-svg"
          id="navExpandIcon"
          onClick={() => setIsNavOpen(x => !x)}
          />
        <img 
          src={plusIcon} 
          alt="expand navigation icon"
          className="nav-interaction-svg"
          id="navExpandSlideIcon"
          onClick={() => setIsNavOpen(x => !x)}
          />
        <div className="nav-padding" id="right"/>
      </div>
      <nav 
        className={`nav-flex ${isNavOpen?'open':'closed'}`} 
        onClick={() => isNavOpen && setIsNavOpen(false)}
      >
        <div className="nav-padding" id="left"/>
        <Link to="/"><li>Home</li></Link>
        <Link to="/upcoming"><li>Upcoming</li></Link>
        {/* <Link to="/photos"><li>Photos</li></Link> */}
        <div className="nav-padding" id="right"/>
      </nav>
    </header>
  );
};

export default Header;