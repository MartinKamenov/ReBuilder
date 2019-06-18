import React, { Component, useState } from 'react';
import './RegisterComponent.css';

const RegisterComponent = () => {
    const [email, changeEmail] = useState('');
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    const [passwordRepeat, changePasswordRepeat] = useState('');
    const [imageUrl, changeImageUrl] = useState('');

    return (
        <div className='register-container'>
            <h3 className='auth-header'>Sign up</h3>
            <form>
                <input
                    className='form-input'
                    type='email'
                    placeholder='Email'
                    onChange={(event) => changeEmail(event.target.value)}
                    value={email}/>
                <input
                    className='form-input'
                    type='text'
                    placeholder='Username'
                    onChange={(event) => changeUsername(event.target.value)}
                    value={username}/>
                <input
                    className='form-input'
                    type='password'
                    placeholder='Password'
                    onChange={(event) => changePassword(event.target.value)}
                    value={password}/>
                <input
                    className='form-input'
                    type='password'
                    placeholder='Password repeat'
                    onChange={(event) => changePasswordRepeat(event.target.value)}
                    value={passwordRepeat}/>
                <input
                    className='form-input'
                    type='text'
                    placeholder='Image url'
                    onChange={(event) => changeImageUrl(event.target.value)}
                    value={imageUrl}/>
                <button
                    className='submit-btn btn btn-success'
                    type='submit'>Sign up</button>
            </form>
        </div>
    );
}
 
export default RegisterComponent;