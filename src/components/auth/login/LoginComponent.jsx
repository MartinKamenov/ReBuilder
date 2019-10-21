import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as authenticationActions from '../../../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './LoginComponent.css';
import LoadingComponent from '../../common/LoadingComponent';
import ButtonComponent from '../../common/ButtonComponent';

const LoginComponent = ({
    history,
    actions: { login: startLogin }
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(state => (state.user));
    const error = useSelector(state => (state.error));

    const redirectToHome = () => {
        setIsLoading(false);
        history.push('/dashboard');
        return;
    }

    const login = () => {
        if(!username || !password) {
            return;
        }

        setIsLoading(true);

        startLogin(username, password);
    }

    const handleEnterPressed = ({ key }) => {
        if (key === 'Enter' && username && password) {
            login();
        }
    }

    useEffect(() => {
        if(user.id) {
            redirectToHome();
        }

        if(error) {
            setIsLoading(false);
            return;
        }
    }, [user, error]);

    if(isLoading) {
        return <LoadingComponent message='Authenticating user' />;
    }
    
    return (
        <div className='auth-container'>
            <div className='login-container'>
                <h3 className='auth-header'>Sign in</h3>
                <div onKeyDown={handleEnterPressed}>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Username'
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}/>
                    <input
                        className='form-input'
                        type='password'
                        placeholder='Password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}/>
                    <ButtonComponent
                        title='Log in'
                        className='submit-btn'
                        type='success'
                        onClick={login}/>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authenticationActions, dispatch)
    };
};
 
export default connect(null, mapDispatchToProps)(LoginComponent);