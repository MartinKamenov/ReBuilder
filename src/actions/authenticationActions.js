import * as types from './actionTypes';
import apiService from '../service/api.service';
import {dismiss, update, error, message, warning, success, info} from 'react-toastify-redux';

export function login(username, password) {
    return async function(dispatch) {
        try {
            const res = await apiService.login(username, password);
            const user = res.data.user;
            if(!user) {
                return dispatch(message(res.data));
            }
            user.token = res.data.token;
            return dispatch(loginSuccess(user));
        } catch(error) {
            return dispatch(error.message);
        }
    };
}

export function loginByToken(token) {
    return async function(dispatch) {
        const res = await apiService.loginByToken(token);
        const user = res.data;
        user.token = token;
        return dispatch(loginSuccess(user));
    };
}

export function loginSuccess(user) {
    localStorage.setItem('token', user.token);

    return { type: types.LOGIN_SUCCESS, user };
}

export function register(username, password, email, imageUrl) {
    return async function(dispatch) {
        const res = await apiService.register(
            username,
            password,
            email,
            imageUrl
        );
        const user = res.data.user;
        user.token = res.data.token;
        return dispatch(loginSuccess(user));
    };
}