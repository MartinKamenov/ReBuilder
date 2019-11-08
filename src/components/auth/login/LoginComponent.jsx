import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as authenticationActions from '../../../actions/authenticationActions';
import LoadingComponent from '../../common/loading-page/LoadingComponent';
import ButtonComponent from '../../common/button/ButtonComponent';
import PropTypes from 'prop-types';
import './LoginComponent.css';

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

    const redirectToHome = useCallback(
        () => {
            setIsLoading(false);
            history.push('/dashboard');
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
            redirectToHome();
        }

        if(error) {
            setIsLoading(false);
            return;
        }
    }, [user, error, redirectToHome]);

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
};

LoginComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};
 
export default LoginComponent;