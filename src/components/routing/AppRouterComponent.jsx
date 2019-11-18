import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardComponent from '../dashboard/DashboardComponent';
import HomeComponent from '../home/HomeComponent';
import NavbarComponent from '../navigation/NavbarComponent';
import LoginComponent from '../auth/login/LoginComponent';
import RegisterComponent from '../auth/register/RegisterComponent';
import EditProjectComponent from '../project/EditProjectComponent';
import InnerRoutingComponent from '../project/innerRouting/InnerRoutingComponent';
import * as authenticationActions from '../../actions/authenticationActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify-redux';
import LoadingComponent from '../common/loading-page/LoadingComponent';
import UserComponent from '../user/UserComponent';
import TemplateSelectPageComponent from '../project/newProjectPage/TemplateSelectPageComponent';
import ServicesComponent from '../services/ServicesComponent';

import 'react-toastify/dist/ReactToastify.css';
import './AppRouterComponent.css';

const AppRouterComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector((state) => state.user);
    const token = localStorage.getItem('token');

    const dispatch = useDispatch();
    
    const loginByToken = useCallback(() => {
        dispatch(authenticationActions.loginByToken(token));
    }, [dispatch, token]);

    useEffect(() => {
        if(!user.id && token) {
            loginByToken(token);
        } else {
            setIsLoading(false);
        }
    }, [user, token, loginByToken]);

    return (
        <Router>
            <div>
                <ToastContainer/>
            </div>
            { isLoading ? (
                <LoadingComponent message='Fetching user'/>
            ) : 
                (
                    <div className='main-container'>
                        <NavbarComponent/>
                        <Route exact path="/" component={HomeComponent} />
                        <div className='navbar-container-margin'>
                            <div className='main-container'>
                                <Route exact path="/dashboard" component={DashboardComponent} />
                                <Route exact path="/login" component={LoginComponent} />
                                <Route exact path="/register" component={RegisterComponent} />
                                <Route exact path="/projects/:id" component={InnerRoutingComponent} />
                                <Route exact path="/users/:id" component={UserComponent} />
                                <Route exact path="/projects/:id/:pageId" component={EditProjectComponent} />
                                <Route exact path="/templates" component={TemplateSelectPageComponent} />
                                <Route exact path="/services" component={ServicesComponent} />
                            </div>
                        </div>
                    </div>
                )}
            
        </Router>
    );
};

export default AppRouterComponent;