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
        </header>
      );
   }
}
export default Header;