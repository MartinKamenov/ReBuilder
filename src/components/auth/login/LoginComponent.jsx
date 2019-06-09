import React, { Component, useState } from 'react';
import './LoginComponent.css';

const LoginComponent = () => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    return ( 
        <div className='login-container'>
            <form>
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
                <button
                    className='btn btn-success'
                    type='submit'>Log in</button>
            </form>
        </div>
    );
}
 
export default LoginComponent;