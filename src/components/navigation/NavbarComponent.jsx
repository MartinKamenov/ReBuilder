import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <React.Fragment>
            <div className='navbar-div'></div>
            <Navbar inverse collapseOnSelect className="main-navbar sticky">
                <Navbar.Header>
                    <Navbar.Brand className="main-header-container">
                        <Link className="navbar-brand main-header" to="/">ReBuilder</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle>Menu</Navbar.Toggle>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem componentClass='span' className="nav-link-container">
                            <Link className="nav-link navbar_element" to="/">Home</Link>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem componentClass='span' className="nav-link-container">
                            <Link className="nav-link navbar_element" to="/overview">Overview</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    );
}
 
export default NavbarComponent;