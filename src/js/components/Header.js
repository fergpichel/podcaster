import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
   render() {
      return (
        <header>
            <nav>
                <ul className="menu">
                    <li className="nav-item"><NavLink to='/'>Podcaster</NavLink></li>
                </ul>
            </nav>
            <span className="spinner spinner__on"></span>
        </header>
      );
   }
}
export default Header;