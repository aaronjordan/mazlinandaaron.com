import {Link} from 'react-router-dom';

import './Header.scss';

export const Header = () => {
  return (
    <header>
      <h1>Mazlin & Aaron</h1>
      <nav className="nav-flex">
        <div className="nav-padding" id="left"/>
        <Link to="/"><li>Home</li></Link>
        <Link to="/upcoming"><li>Upcoming</li></Link>
        {/* <Link to="/l3"><li>RSVP</li></Link>
        <Link to="/l4"><li>Registry</li></Link> */}
        <div className="nav-padding" id="right"/>
      </nav>
    </header>
  );
};

export default Header;