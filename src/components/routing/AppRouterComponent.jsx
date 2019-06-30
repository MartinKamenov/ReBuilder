import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardComponent from '../dashboard/DashboardComponent';
import NavbarComponent from '../navigation/NavbarComponent';
import LoginComponent from '../auth/login/LoginComponent';
import RegisterComponent from '../auth/register/RegisterComponent';
import NewProjectComponent from '../project/NewProjectComponent';
import NewProjectPageComponent from '../project/newProjectPage/NewProjectPageComponent';

const AppRouterComponent = () => {
    return (
        <Router>
            <div className='main-container'>
                <NavbarComponent/>
                <Route exact path="/" component={DashboardComponent} />
                <div className='container'>
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/register" component={RegisterComponent} />
                    <Route exact path="/projects/:id" component={NewProjectComponent} />
                    <Route exact path="/project/new" component={NewProjectPageComponent} />
                </div>
            </div>
        </Router>    
    );
};
 
export default AppRouterComponent;