import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useProfile } from '../hooks/useProfile';

function NavComponent(props) {
    const navData = props.user;
    const {logout} = useLogout()
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {getUserData, userData} = useProfile()

    useEffect(() => {
      if (user) {
        getUserData(user.username);
      }
      
    }, [user]);

    const handleClick = () => {
        logout()
        navigate('/login')
      }
    
    
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">MERN_APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/followers">Followers</Nav.Link>
              <Nav.Link href="/timeline">Timeline</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user && (
              <div>
                <Navbar.Text>Signed in as: <a href={"/profile/" + userData._id}>{user.username} </a></Navbar.Text>
                <button className='btn btn-outline-warning float-right' onClick={handleClick}>Log Out</button>
              </div>
            )}
        </Container>
      </Navbar>
    );
}
  
export default NavComponent;