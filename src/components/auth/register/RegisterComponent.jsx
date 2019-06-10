import React, { Component, useState } from 'react';
import './RegisterComponent.css';

const RegisterComponent = () => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');

    return (
        <div className='register-container'>
            <h2>Sign up</h2>
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
                    className='submit-btn btn btn-success'
                    type='submit'>Log in</button>
            </form>
        </div>
    );
}
 
export default RegisterComponent;