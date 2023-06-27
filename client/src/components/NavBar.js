import React, { useState, useEffect } from 'react';
import '../App.css';
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
      <Navbar className='border-bottom' bg="dark" variant="dark" data-bs-theme="dark" >
        <Container className="ml-2 mr-2">
          <Navbar.Brand href="/">MERN_APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/followers">Followers</Nav.Link>
              <Nav.Link href="/timeline">Timeline</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user && (
            <div className='right'>
              <Nav className="me-auto" >
              <Navbar.Text>Signed in as: <Link to={`/profile/${userData._id}`}>{userData.username}</Link></Navbar.Text>
                <button className='btn btn-outline-warning float-right' onClick={handleClick}>Log Out</button>
              </Nav>
            </div>
              
            )}
        </Container>
      </Navbar>
    );
}
  
export default NavComponent;