import React, { Component } from 'react';
import LoadingComponent from '../../common/LoadingComponent';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './RegisterComponent.css';
import ButtonComponent from '../../common/ButtonComponent';


class RegisterComponent extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        passwordRepeat: '',
        imageUrl: '',
        isLoading: false
    }

    handleInputChange = (value, field) => {
        this.setState({[field]: value});
    }

    handleEnterPressed = (key) => {
        if (key === "Enter") {
            this.register();
        }
    }
    
    register = () => {
        if(!this.state.username ||
            !this.state.password ||
            !this.state.passwordRepeat ||
            !this.state.email ||
            !this.state.imageUrl) {
            return;
        }

        if(this.state.password !== this.state.passwordRepeat) {
            return;
        }

        this.setState({ isLoading: true });

        this.props.actions.register(
            this.state.username,
            this.state.password,
            this.state.email,
            this.state.imageUrl
        );
    }

    render() {
        if(this.props.user.id) {
            this.setState({ isLoading: false });
            const history = this.props.history;
            history.push('/');
        }

        if(this.state.isLoading) {
            return <LoadingComponent message='Authenticating user' />;
        }

        return (
            <div className='auth-container'>
                <div className='register-container'>
                    <h3 className='auth-header'>Sign up</h3>
                    <div onKeyDown={(event) => this.handleEnterPressed(event.key)}>
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
                        <ButtonComponent
                            title='Sign up'
                            className='submit-btn'
                            type='success'
                            onClick={this.register}/>
                    </div>
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
