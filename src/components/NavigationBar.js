import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import "../customcss/mystylesheet.css"

function NavigationBar(){
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Sotahistoria</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="myLink">Etusivu</Link>
          <Link to="/SearchWar" className="myLink">Etsi sotia</Link>
          <Link to="/AddWar" className="myLink">Lisää sota</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

export default NavigationBar