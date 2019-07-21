import React, { Component } from 'react';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './LoginComponent.css';
import LoadingComponent from '../../common/LoadingComponent';
import ButtonComponent from '../../common/ButtonComponent';

class LoginComponent extends Component {
    state = {
        username: '',
        password: '',
        isLoading: false
    }

    handleInputChange = (value, field) => {
        this.setState({[field]: value});
    }
    handleEnterPressed = (key) => {
        if (key === "Enter") {
            this.login()
        }
    }

    componentWillReceiveProps(props) {
        if(props.user.id) {
            this.setState({ isLoading: false });
            const history = this.props.history;
            history.push('/');
            return;
        }

        if(props.error) {
            this.setState({ isLoading: false });
        }
    }

    login = () => {
        if(!this.state.username || !this.state.password) {
            return;
        }

        this.setState({ isLoading: true });

        this.props.actions.login(this.state.username, this.state.password);
    }
    
    render() {
        if(this.state.isLoading) {
            return <LoadingComponent message='Authenticating user' />
        }
        
        return (
            <div className='auth-container'>
                <div className='login-container'>
                    <h3 className='auth-header'>Sign in</h3>
                    <div
                        onKeyDown={(event) => this.handleEnterPressed(event.key)}>
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
                        <ButtonComponent
                            title='Log in'
                            className='submit-btn'
                            type='success'
                            onClick={this.login}/>
                    </div>
                </div>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);