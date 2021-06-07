import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
  return (
    <footer>
      <div className="content">
        <span>
          <Link to="/privacy-policy">View our Privacy Policy</Link>
        </span>       
        <span>
          August 1, 2021
        </span>
        <span>
          Made with love by Aaron.
        </span>
      </div>
    </footer>
  )
}
