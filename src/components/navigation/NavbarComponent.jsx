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
        <header role="banner" className="probootstrap-header">
          <div className="container-fluid">
            <a href="index.html" className="probootstrap-logo">Format<span>.</span></a>
            <a href="#" className="probootstrap-burger-menu visible-xs"><i>Menu</i></a>
            <div className="mobile-menu-overlay" />
            <nav role="navigation" className="probootstrap-nav hidden-xs">
              <ul className="probootstrap-main-nav">
                <li><Link className="active" to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/products.html">Product</Link></li>
                <li><Link to="/about.html">About</Link></li>
                <li><Link to="/contact.html">Contact</Link></li>
              </ul>
              <div className="extra-text visible-xs">
                <a href="#" className="probootstrap-burger-menu"><i>Menu</i></a>
                <h5>Social</h5>
                <ul className="social-buttons">
                  <li><a href="#"><i className="icon-twitter" /></a></li>
                  <li><a href="#"><i className="icon-facebook" /></a></li>
                  <li><a href="#"><i className="icon-instagram2" /></a></li>
                </ul>
                <p><small>© Copyright 2017 uiCookies:Format. All Rights Reserved.</small></p>
              </div>
            </nav>
          </div>
        </header>
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