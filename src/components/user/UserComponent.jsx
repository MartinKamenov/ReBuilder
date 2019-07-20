import React, { Component } from 'react';
import * as authenticationActions from '../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

import './UserComponent.css';
import ButtonComponent from '../common/ButtonComponent';

class UserComponent extends Component {
    componentWillReceiveProps(props) {
        debugger;
        const token = localStorage.getItem('token');
        if(!props.user.id && !token) {
            const history = this.props.history;
            history.push('/login');
            return;
        }
    }
    logout = () => {
        this.props.actions.logout();
    }
    render() {
        const user = this.props.user;
        return (
            <div className='center-container user-container'>
                <img
                    className='user-component-user-image'
                    alt='user image'
                    src={user.imageUrl}/>
                <h3>
                    {user.username}
                </h3>
                <ButtonComponent
                    className='logout-btn'
                    type='danger'
                    onClick={this.logout}>
                    <FontAwesomeIcon className='action-icon' icon={faUndo} />
                    Logout
                </ButtonComponent>
            </div>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);