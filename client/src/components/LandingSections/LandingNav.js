import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link as LinkR} from 'react-router-dom';

function LandingNav(props) {
    const navData = props.user;
    const navigate = useNavigate();

    const onClick = (e) => {
      const element = document.getElementById(`section-${e}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      };
    };

    return (
      <Navbar
        className="border-bottom"
        bg="dark"
        variant="dark"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container className="ml-2 mr-2">
          <Navbar.Brand onClick={() => onClick(1)}>LoLBuddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => onClick(2)}>About</Nav.Link>
              <Nav.Link onClick={() => onClick(3)}>Users</Nav.Link>
              <Nav.Link onClick={() => onClick(4)}>Timeline</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <LinkR to='/login' className='btn btn-outline-warning float-right'> Login </LinkR>
      </Navbar>
    );
  }
  
  export default LandingNav;
  