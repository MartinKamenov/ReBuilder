import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './NavbarComponent.css';

class NavbarComponent extends Component {
    state = {
        routes: [
          { route: '/', text: 'Home' }
        ]
    }
    componentDidMount() {
        const user = this.props.user;
        const routes = [...this.state.routes];
        if(user.id) {
            routes.push({ route: `/users/${user.id}`, text: 'My profile' });
            routes.push({ route: '/dashboard', text: 'Dashboard' });
        } else {
            routes.push({ route: `/login`, text: 'Sign in' });
            routes.push({ route: `/register`, text: 'Sign up' });
        }

        this.setState({ routes });
    }
    render() {
        debugger;
        return ( 
          <header role="banner" className="probootstrap-header">
                <div className="container-fluid">
                    <a href="index.html" className="probootstrap-logo">ReBuilder</a>
                    <a href="#" className="probootstrap-burger-menu visible-xs"><i>Menu</i></a>
                    <div className="mobile-menu-overlay" />
                    <nav role="navigation" className="probootstrap-nav hidden-xs">
                    <ul className="probootstrap-main-nav">
                    {
                        this.state.routes.map((route, i) => {
                          return (
                            <li key={i}>
                                <Link className="active" to={route.route}>{route.text}</Link>
                            </li>
                          );
                        })
                    }
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