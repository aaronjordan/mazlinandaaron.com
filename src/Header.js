import {useState} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header>
      <h1>Mazlin & Aaron</h1>
      <div className={`mobile-controls ${isNavOpen?'open':'closed'}`} >
        <div className="nav-padding" id="left"/>
        <FontAwesomeIcon 
          icon={faPlusCircle} 
          id="navExpandIcon"
          size="1x"
          onClick={() => setIsNavOpen(x => !x)}
        />
        <FontAwesomeIcon 
          icon={faPlusCircle} 
          id="navExpandSlideIcon"
          size="1x"
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
        <div className="nav-padding" id="right"/>
      </nav>
    </header>
  );
};

export default Header;