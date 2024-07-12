import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../Css/style.css';

const Header = ({ onLogout }) => {
  return (
    <Navbar expand="lg" className="custom-header">
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={onLogout} className="ml-auto logout-button">
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
