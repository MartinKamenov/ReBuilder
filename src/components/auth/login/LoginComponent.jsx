import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as authenticationActions from '../../../actions/authenticationActions';
import ButtonComponent from '../../common/button/ButtonComponent';
import PropTypes from 'prop-types';
import './LoginComponent.css';
import InputComponent from '../../common/input/InputComponent';
import LoadingIndicator from '../../common/loading-indicator/LoadingIndicator';

const LoginComponent = ({
    history
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(state => (state.user));
    const error = useSelector(state => (state.error));
    const dispatch = useDispatch();
    const startLogin = useCallback(
        () => dispatch(authenticationActions.login(username, password)),
        // Subscribe to changes username and password
        [dispatch, username, password]
    );

    const redirectTo = useCallback(
        (path) => {
            setIsLoading(false);
            history.push(path);
            return;
        },
        [history]
    );

    const login = () => {
        if(!username || !password) {
            return;
        }

        setIsLoading(true);

        startLogin(username, password);
    };

    const handleEnterPressed = ({ key }) => {
        if (key === 'Enter' && username && password) {
            login();
        }
    };

    useEffect(() => {
        if(user.id) {
            redirectTo('/dashboard');
        }

        if(error) {
            setIsLoading(false);
            return;
        }
    }, [user, error, redirectTo]);
    
    return (
        <div className='auth-container'>
            { isLoading ? <LoadingIndicator message='Authenticating user' /> : null }
            <div className='login-container'>
                <h3 className='auth-header'>Sign in</h3>
                <div onKeyDown={handleEnterPressed}>
                    <InputComponent
                        autoFocus
                        className='form-input'
                        type='text'
                        placeholder='Username'
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}/>
                    <InputComponent
                        className='form-input'
                        type='password'
                        placeholder='Password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}/>
                    <ButtonComponent
                        disabled={isLoading}
                        title='Log in'
                        className='submit-btn'
                        variant='contained'
                        type='success'
                        onClick={login}/>
                    <p className='auth-suggest'>Not a member yet? Join Now</p>
                    <ButtonComponent
                        disabled={isLoading}
                        title='Sign up here'
                        className='submit-btn'
                        variant='contained'
                        color='default'
                        onClick={() => redirectTo('/register')}/>
                </div>
            </div>
        </div>
    );
};

LoginComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};
 
export default LoginComponent;