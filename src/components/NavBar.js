import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({loggedInUser}) => (
  <div>
    <nav>
      <ul>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/add'>New Question</NavLink>
      </ul>
    </nav>
    <Link to='/logout'><button>Logout</button></Link>
  </div>
);

export default NavBar;