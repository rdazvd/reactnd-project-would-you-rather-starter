import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Button,
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
              <NavLink className='nav-item nav-link' exact to='/'>Home</NavLink>
              <NavLink className='nav-item nav-link' exact to='/add'>New Question</NavLink>
              <NavLink className='nav-item nav-link' exact to='/add'>Leaderboard</NavLink>
            </ul>
          </Col>
          <Col xs='auto'>
            <span className='navbar-text text-info'>Hello {loggedInUser.name}</span>
            <span className='navbar-item'><Link to='/logout'>Logout</Link></span>
          </Col>
        </Row>
      </Container>
    </nav>
  </div>
);

export default NavBar;