import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavbarComponent.css';

const NavbarComponent = () => {
    const [routes, setRoutes] = useState([{ route: '/', text: 'Home' }]);

    const user = useSelector((state) => (state.user));

    useEffect(() => {
        const routesCopy = [{ route: '/', text: 'Home' }];
        if(user.id) {
            routesCopy.push({ route: '/dashboard', text: 'Dashboard' });
            routesCopy.push({ route: '/services', text: 'Services' });
            routesCopy.push({ route: `/users/${user.id}`, text: 'My profile' });
        } else {
            routesCopy.push({ route: '/services', text: 'Services' });
            routesCopy.push({ route: '/login', text: 'Sign in' });
            routesCopy.push({ route: '/register', text: 'Sign up' });
        }

        setRoutes(routesCopy);
    }, [user]);

    return (
        <header role="banner" className="probootstrap-header">
            <div className="container-fluid">
                <Link to='/' className="probootstrap-logo">ReBuilder</Link>
                <Link to='#' className="probootstrap-burger-menu visible-xs"><i></i></Link>
                <div className="mobile-menu-overlay" />
                <nav role="navigation" className="probootstrap-nav hidden-xs">
                    <ul className="probootstrap-main-nav">
                        {
                            routes.map((route, i) => {
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
};
 
export default NavbarComponent;