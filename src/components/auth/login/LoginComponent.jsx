import React, { Component, useState } from 'react';

const LoginComponent = () => {
    return ( 
        <div className='login-container'>
            <form>
                <input/>
                <input/>
                <button
                    className='btn btn-success'
                    type='submit'>Log in</button>
            </form>
        </div>
    );
}
 
export default LoginComponent;