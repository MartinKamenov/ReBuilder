import React, { useEffect, useState, useCallback } from 'react';
import * as authenticationActions from '../../../actions/authenticationActions';
import { useSelector, useDispatch } from 'react-redux';
import './RegisterComponent.css';
import PropTypes from 'prop-types';
import ButtonComponent from '../../common/button/ButtonComponent';
import InputComponent from '../../common/input/InputComponent';
import LoadingIndicator from '../../common/loading-indicator/LoadingIndicator';

const RegisterComponent = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnUMov053v0hONBpUNyQoint83KzTEMW_vXxNWHOEBbaqATtTq';
    
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const register = useCallback(() => {
        if(!username ||
            !password ||
            !passwordRepeat ||
            !email) {
            return;
        }

        if(password !== passwordRepeat) {
            return;
        }

        setIsLoading(true);

        dispatch(authenticationActions.register(
            username,
            password,
            email,
            imageUrl
        ));
    }, [dispatch, username, password, passwordRepeat, email, imageUrl]);

    const handleEnterPressed = useCallback(({ key }) => {
        if (key === 'Enter') {
            register();
        }
    }, [register]);

    const redirectTo = useCallback(
        (path) => {
            setIsLoading(false);
            history.push(path);
            return;
        },
        [history]
    );

    useEffect(() => {
        if(user.id) {
            redirectTo('/dashboard');
        }
    }, [user, redirectTo]);

    return (
        <div className='auth-container'>
            { isLoading ? <LoadingIndicator message='Signing user' /> : null }
            <div className='register-container'>
                <h3 className='auth-header'>Sign up</h3>
                <div onKeyDown={handleEnterPressed}>
                    <InputComponent
                        autoFocus
                        className='form-input'
                        type='email'
                        placeholder='Email'
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}/>
                    <InputComponent
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
                    <InputComponent
                        className='form-input'
                        type='password'
                        placeholder='Password repeat'
                        onChange={(event) => setPasswordRepeat(event.target.value)}
                        value={passwordRepeat}/>
                    <ButtonComponent
                        disabled={isLoading}
                        title='Sign up'
                        className='submit-btn'
                        variant='contained'
                        type='success'
                        onClick={register}/>
                    <p className='auth-suggest'>Already a member?</p>
                    <ButtonComponent
                        disabled={isLoading}
                        title='Sign in here'
                        className='submit-btn'
                        variant='contained'
                        color='default'
                        onClick={() => redirectTo('/login')}/>
                </div>
            </div>
        </div>
    );
};

RegisterComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};
 
export default RegisterComponent;
