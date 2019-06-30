import React, { Component } from 'react';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './RegisterComponent.css';

class RegisterComponent extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        passwordRepeat: '',
        imageUrl: ''
    }

    handleInputChange = (value, field) => {
        this.setState({[field]: value});
    }

    register = () => {
        if(!this.state.username ||
            !this.state.password ||
            !this.state.passwordRepeat ||
            !this.state.email ||
            !this.state.imageUrl) {
            return;
        }

        this.props.actions.register(
            this.state.username,
            this.state.password,
            this.state.passwordRepeat,
            this.state.email,
            this.state.imageUrl
        );
    }

    render() {
        if(this.props.user.id) {
            const history = this.props.history;
            history.push('/');
        }

        return (
            <div className='register-container'>
                <h3 className='auth-header'>Sign up</h3>
                <div>
                    <input
                        className='form-input'
                        type='email'
                        placeholder='Email'
                        onChange={(event) => 
                            this.handleInputChange(event.target.value, 'email')}
                        value={this.state.email}/>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Username'
                        onChange={(event) => 
                            this.handleInputChange(event.target.value, 'username')}
                        value={this.state.username}/>
                    <input
                        className='form-input'
                        type='password'
                        placeholder='Password'
                        onChange={(event) => 
                            this.handleInputChange(event.target.value, 'password')}
                        value={this.state.password}/>
                    <input
                        className='form-input'
                        type='password'
                        placeholder='Password repeat'
                        onChange={(event) => 
                            this.handleInputChange(event.target.value, 'passwordRepeat')}
                        value={this.state.passwordRepeat}/>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Image url'
                        onChange={(event) => 
                            this.handleInputChange(event.target.value, 'imageUrl')}
                        value={this.state.imageUrl}/>
                    <button
                        onClick={this.register}
                        className='submit-btn btn btn-success'
                        type='submit'>Sign up</button>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
