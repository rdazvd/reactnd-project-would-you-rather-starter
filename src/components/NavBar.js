import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Col,
  Container,
  Row
 } from 'react-bootstrap';

const NavBar = ({loggedInUser}) => (
  <div>
    <nav className='navbar navbar-expand navbar-light bg-light'>
      <Container className='collapse navbar-collapse'>
        <Row className='justify-content-between' style={{ width: '100vw' }}>
          <Col xs='auto'>
            <ul className='navbar-nav'>
              <NavLink 
                activeClassName='active'
                className='nav-item nav-link' 
                exact to='/'
              >
                Home
              </NavLink>
              <NavLink 
                activeClassName='active'
                className='nav-item nav-link'
                exact to='/add'
              >
                New Question
              </NavLink>
              <NavLink 
                activeClassName='active'
                className='nav-item nav-link'
                exact to='/leaderboard'
              >
                Leaderboard
              </NavLink>
            </ul>
          </Col>
          <Col xs='auto'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <span className='navbar-text mr-3 text-info'>
                  Hello {loggedInUser.name}
                </span>
              </li>
              <Link className='nav-item nav-link' to='/logout'>Logout</Link>
            </ul>
          </Col>
        </Row>
      </Container>
    </nav>
  </div>
);

export default NavBar;