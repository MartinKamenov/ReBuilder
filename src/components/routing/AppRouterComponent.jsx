import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardComponent from '../dashboard/DashboardComponent';
import HomeComponent from '../../theme/HomeComponent';
import NavbarComponent from '../navigation/NavbarComponent';
import LoginComponent from '../auth/login/LoginComponent';
import RegisterComponent from '../auth/register/RegisterComponent';
import EditProjectComponent from '../project/EditProjectComponent';
import NewProjectPageComponent from '../project/newProjectPage/NewProjectPageComponent';
import InnerRoutingComponent from '../project/innerRouting/InnerRoutingComponent';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify-redux';
import LoadingComponent from '../common/LoadingComponent';
import UserComponent from '../user/UserComponent';

import 'react-toastify/dist/ReactToastify.css';

class AppRouterComponent extends Component {
    state = {
        isLoading: true
    }
    componentDidMount() {
        const user = this.props.user;
        const token = localStorage.getItem('token'); 
        if(!user.id && token) {
            this.props.actions.loginByToken(token);
        } else {
            this.setState({ isLoading: false });
        }
    }

    componentWillReceiveProps() {
        this.setState({ isLoading: false });
    }
    render() {
        return (
            <Router>
                <div>
                    <ToastContainer/>
                </div>
                { this.state.isLoading ? (
                    <LoadingComponent message='Fetching user'/>
                ) : 
                (
                    <div className='main-container'>
                        <NavbarComponent/>
                        <Route exact path="/" component={HomeComponent} />
                        <Route exact path="/dashboard" component={DashboardComponent} />
                        <Route exact path="/login" component={LoginComponent} />
                        <Route exact path="/register" component={RegisterComponent} />
                        <Route exact path="/projects/:id" component={InnerRoutingComponent} />
                        <Route exact path="/users/:id" component={UserComponent} />
                        <Route exact path="/projects/:id/:pageId" component={EditProjectComponent} />
                        <div className='container'>
                            <Route exact path="/project/new" component={NewProjectPageComponent} />
                        </div>
                    </div>
                )}
                
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        error: state.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authenticationActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouterComponent);