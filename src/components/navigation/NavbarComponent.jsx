import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './NavbarComponent.css';

class NavbarComponent extends Component {
    render() {
        return ( 
            <Fragment>
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
                        { this.props.user.username ? (
                            <Nav pullRight>
                                <NavItem componentClass='span' className="nav-link-container">
                                    <Link className="nav-link navbar_element"
                                        to={"/user/" + this.props.user.id}>
                                        Hello, {this.props.user.username}
                                    </Link>
                                </NavItem>
                            </Nav>  
                        ) : (
                            <Nav pullRight>
                                <Nav>
                                    <NavItem componentClass='span' className="nav-link-container">
                                        <Link className="nav-link navbar_element" to="/login">Sign in</Link>
                                    </NavItem>
                                </Nav>
                                <Nav>
                                    <NavItem componentClass='span' className="nav-link-container">
                                        <Link className="nav-link navbar_element" to="/register">Sign up</Link>
                                    </NavItem>
                                </Nav>
                            </Nav>
                        ) } 
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authenticationActions, dispatch)
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);