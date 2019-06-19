import React, { Component } from 'react';
import apiService from '../../../service/api.service.js';
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
        apiService.login(this.state.username, this.state.password).then((r) => {
            alert(r);
        });
    }
    
    render() {  
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
 
export default LoginComponent;