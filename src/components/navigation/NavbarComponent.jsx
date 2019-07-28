import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './NavbarComponent.css';

class NavbarComponent extends Component {
    render() {
        return ( 
        <header role="banner" className="probootstrap-header">
          <div className="container-fluid">
            <a href="index.html" className="probootstrap-logo">ReBuilder</a>
            <a href="#" className="probootstrap-burger-menu visible-xs"><i>Menu</i></a>
            <div className="mobile-menu-overlay" />
            <nav role="navigation" className="probootstrap-nav hidden-xs">
              <ul className="probootstrap-main-nav">
                <li><Link className="active" to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/products.html">Product</Link></li>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/register">Sign up</Link></li>
              </ul>
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