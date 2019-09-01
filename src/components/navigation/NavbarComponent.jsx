import React, { Component } from 'react';
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

    getRoutes = (props) => {
        const user = props ? props.user : this.props.user;
        const routes = [
            { route: '/', text: 'Home' }
        ];

        if(user.id) {
            routes.push({ route: '/dashboard', text: 'Dashboard' });
            routes.push({ route: '/services', text: 'Services' });
            routes.push({ route: `/users/${user.id}`, text: 'My profile' });
        } else {
            routes.push({ route: '/services', text: 'Services' });
            routes.push({ route: `/login`, text: 'Sign in' });
            routes.push({ route: `/register`, text: 'Sign up' });
        }

        this.setState({ routes });
    }
    componentDidMount() {
        this.getRoutes();
    }

    componentWillReceiveProps = (props) => {
        this.getRoutes(props);
    }
    render() {
        return ( 
          <header role="banner" className="probootstrap-header">
                <div className="container-fluid">
                    <Link to='/' className="probootstrap-logo">ReBuilder</Link>
                    <Link to='#' className="probootstrap-burger-menu visible-xs"><i></i></Link>
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