import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardComponent from '../dashboard/DashboardComponent';
import NavbarComponent from '../navigation/NavbarComponent';
import LoginComponent from '../auth/login/LoginComponent';
import RegisterComponent from '../auth/register/RegisterComponent';
import EditProjectComponent from '../project/EditProjectComponent';
import NewProjectPageComponent from '../project/newProjectPage/NewProjectPageComponent';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
                <div className='main-container'>
                    <NavbarComponent/>
                    <Route exact path="/" component={DashboardComponent} />
                    <div className='container'>
                        <Route exact path="/login" component={LoginComponent} />
                        <Route exact path="/register" component={RegisterComponent} />
                        <Route exact path="/projects/:id" component={EditProjectComponent} />
                        <Route exact path="/project/new" component={NewProjectPageComponent} />
                    </div>
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