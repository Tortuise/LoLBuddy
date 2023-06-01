import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavComponent(props) {
    const {logout} = useLogout()
    const handleClick = () => {
        logout()
      }
    const user = props.user
    
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">MERN_APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/followers">Followers</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user && (
              <div>
                <Navbar.Text>Signed in as: <a href="#login">{user.username}</a></Navbar.Text>
                <button className='btn btn-outline-warning float-right' onClick={handleClick}> Log Out</button>
              </div>
            )}
        </Container>
      </Navbar>
    );
}
  
export default NavComponent;