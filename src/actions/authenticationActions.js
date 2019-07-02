import * as types from './actionTypes';
import apiService from '../service/api.service';

export function login(username, password) {
    return async function(dispatch) {
        const res = await apiService.login(username, password);
        const user = res.data.user;
        user.token = res.data.token;
        return dispatch(loginSuccess(user));
    };
}

export function loginSuccess(user) {
    return { type: types.LOGIN_SUCCESS, user };
}

export function register(username, password, email, imageUrl) {
    return async function(dispatch) {
        debugger;
        const res = await apiService.register(
            username,
            password,
            email,
            imageUrl
        );
        const user = res.data.user;
        user.token = res.data.token;
        return dispatch(registerSuccess(user));
    };
}

export function registerSuccess(user) {
    return { type: types.REGISTER_SUCCESS, user };
}