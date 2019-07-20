import * as types from './actionTypes';
import apiService from '../service/api.service';
import { error as toastError } from 'react-toastify-redux';
import { createError } from './errorActions';

export function login(username, password) {
    return async function(dispatch) {
        try {
            const res = await apiService.login(username, password);
            const user = res.data.user;
            if(!user) {
                dispatch(toastError(res.data));
                return dispatch(createError(res.data));
            }
            user.token = res.data.token;
            return dispatch(loginSuccess(user));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function loginByToken(token) {
    return async function(dispatch) {
        try {
            const res = await apiService.loginByToken(token);
            const user = res.data;
            user.token = token;
            return dispatch(loginSuccess(user));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function logout() {
    return async function(dispatch) {
        try {
            return dispatch(logoutSuccess());
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function logoutSuccess() {
    localStorage.removeItem('token');

    return { type: types.LOGOUT_SUCCESS, user: {} };
}

export function loginSuccess(user) {
    localStorage.setItem('token', user.token);

    return { type: types.LOGIN_SUCCESS, user };
}

export function register(username, password, email, imageUrl) {
    return async function(dispatch) {
        try {
            const res = await apiService.register(
                username,
                password,
                email,
                imageUrl
            );
            const user = res.data.user;
            if(!user) {
                dispatch(toastError(res.data));
                return dispatch(createError(res.data));
            }
            user.token = res.data.token;
            return dispatch(loginSuccess(user));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}