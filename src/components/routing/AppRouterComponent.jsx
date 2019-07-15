import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardComponent from '../dashboard/DashboardComponent';
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
import 'react-toastify/dist/ReactToastify.css';

class AppRouterComponent extends Component {
    componentDidMount() {
        const user = this.props.user;
        const token = localStorage.getItem('token'); 
        if(!user.id && token) {
            this.props.actions.loginByToken(token);
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <ToastContainer/>
                </div>
                <div className='main-container'>
                    <NavbarComponent/>
                    <Route exact path="/" component={DashboardComponent} />
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/register" component={RegisterComponent} />
                    <div className='container'>
                        <Route exact path="/projects/:id" component={InnerRoutingComponent} />
                        <Route exact path="/project/new" component={NewProjectPageComponent} />
                    </div>
                    <Route exact path="/projects/:id/:pageId" component={EditProjectComponent} />
                </div>
            </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppRouterComponent);