import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from '../home/HomeComponent';
import NavbarComponent from '../navigation/NavbarComponent';
import LoginComponent from '../auth/login/LoginComponent';
import RegisterComponent from '../auth/register/RegisterComponent';
import NewProjectComponent from '../project/NewProjectComponent';

const AppRouterComponent = () => {
    return (
        <Router>
            <div className='main-container'>
                <NavbarComponent/>
                <div className='container'>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/register" component={RegisterComponent} />
                    <Route exact path="/project/new" component={NewProjectComponent} />
                </div>
            </div>
        </Router>    
    );
};
 
export default AppRouterComponent;