import React, { Component } from 'react';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './LoginComponent.css';

class LoginComponent extends Component {
    state = {
        username: '',
        password: ''
    }

    handleInputChange = (value, field) => {
        this.setState({[field]: value});
    }

    login = () => {
        if(!this.state.username || !this.state.password) {
            return;
        }

        this.props.actions.login(this.state.username, this.state.password);
    }
    
    render() {
        if(this.props.user.id) {
            const history = this.props.history;
            history.push('/');
        }
        
        return ( 
            <div className='login-container'>
                <h3 className='auth-header'>Sign in</h3>
                <div>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Username'
                        onChange={(event) => this.handleInputChange(event.target.value, 'username')}
                        value={this.state.username}/>
                    <input
                        className='form-input'
                        type='password'
                        placeholder='Password'
                        onChange={(event) => this.handleInputChange(event.target.value, 'password')}
                        value={this.state.password}/>
                    <button
                        className='submit-btn btn btn-success'
                        onClick={this.login}>Log in</button>
                </div>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);