import React, { Component } from 'react';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './LoginComponent.css';
import LoadingComponent from '../../common/LoadingComponent';

class LoginComponent extends Component {
    state = {
        username: '',
        password: '',
        isLoading: false
    }

    handleInputChange = (value, field) => {
        this.setState({[field]: value});
    }

    login = () => {
        if(!this.state.username || !this.state.password) {
            return;
        }

        this.setState({ isLoading: true });

        this.props.actions.login(this.state.username, this.state.password);
    }
    
    render() {
        if(this.props.user.id) {
            this.setState({ isLoading: false });
            const history = this.props.history;
            history.push('/');
        }

        if(this.state.isLoading) {
            return <LoadingComponent message='Authenticating user' />
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