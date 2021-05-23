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
        <div className="nav-inner-contents">
          <span className="tablet-row">
            <Link to="/"><li>Home</li></Link>
            <Link to="/rsvp" className="disabled"><li>RSVP</li></Link>
            <Link to="/visiting-htx"><li>Visiting Houston</li></Link>
            <Link to="/registry"><li>Registry</li></Link>
          </span>
          <span className="tablet-row">
            <Link to="/livestream" className="disabled"><li>Livestream</li></Link>
            <Link to="/wedding-party"><li>Wedding Party</li></Link>
            <Link to="/photos"><li>Photos</li></Link>
          </span>
        </div>
        <div className="nav-padding" id="right"/>
      </nav>
    </header>
  );
};

export default Header;