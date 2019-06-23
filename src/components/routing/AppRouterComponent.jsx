import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardComponent from '../dashboard/DashboardComponent';
import NavbarComponent from '../navigation/NavbarComponent';
import LoginComponent from '../auth/login/LoginComponent';
import RegisterComponent from '../auth/register/RegisterComponent';

const AppRouterComponent = () => {
    return (
        <Router>
            <div className='main-container'>
                <NavbarComponent/>
                <Route exact path="/" component={DashboardComponent} />
                <div className='container'>
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/register" component={RegisterComponent} />
                </div>
            </div>
        </Router>    
    );
};
 
export default AppRouterComponent;