import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";

function NavigationBar(){
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/SearchWar">Search Wars</Link>
          <Link to="/AddWar">Add wars</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

export default NavigationBar