import React, { Component } from 'react';
import LoadingComponent from '../../common/LoadingComponent';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './RegisterComponent.css';
import ButtonComponent from '../../common/ButtonComponent';
import apiService from '../../../service/api.service';

class RegisterComponent extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        passwordRepeat: '',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnUMov053v0hONBpUNyQoint83KzTEMW_vXxNWHOEBbaqATtTq',
        isLoading: false
    }

    componentDidMount = () => {
        const user = this.props.user;
        if(user.id) {
            this.redirectToHome();
        }
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

    changeImage = async(event) => {
        const target = event.target;
        if (!target.files || !target.files[0]) {
            return;
        }

        const file = target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.name);

        try {
            const res = await apiService.uploadImage(formData);
            this.setState({ imageUrl: res.data.data.link });
        } catch(error) {
            console.log(error);
        }
    }

    componentWillReceiveProps = (props) => {
        if(props.user.id) {
            this.redirectToHome();
        }
    }

    redirectToHome = () => {
        this.setState({ isLoading: false });
        const history = this.props.history;
        history.push('/dashboard');
    }
    render() {
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
