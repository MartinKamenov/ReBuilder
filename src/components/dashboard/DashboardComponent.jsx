import React, { Component } from 'react';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import './DashboardComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import UserProjectsListComponent from './user-projects/UserProjectsListComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingComponent from '../common/LoadingComponent';


class DashboardComponent extends Component {
    state = {
        isLoading: false
    }
    componentDidMount() {
        const user = this.props.user;
        const token = localStorage.getItem('token'); 
        if(!user.id && token) {
            this.props.actions.loginByToken(token);
            this.setState({ isLoading: true });
        }
    }

    componentWillReceiveProps(props) {
        if(props.user.id) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Loading...' />;
        }
        if (!this.props.user.id) {
            return (
                <div className="unauthorized-container">
                    <h1>Unauthorized</h1>
                    <p>Please log in using your credentials</p>
                    <Link to='/login' className="nav-link navbar_element">Log In</Link>
                </div>
            )
        }
        return ( 
            <div>
                <nav id="user-navbar">
                    <button className="user-profile">
                        <div className="navbar-brand user-image">
                            <img src={this.props.user.imageUrl} height="100%" alt="user avatar" />
                        </div>
                        <div className="username">{this.props.user.username}
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </button>
                    <Link
                        to='/project/new'
                        type="button"
                        className="btn btn-outline-dark">
                            New <FontAwesomeIcon icon={faPlusCircle} />
                    </Link>
                </nav>
                <UserProjectsListComponent projects={this.props.user.projects}/>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);