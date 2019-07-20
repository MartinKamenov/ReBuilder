import * as types from '../actions/actionTypes';

export default function updateUserReducer(user = {}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
        case types.LOGOUT_SUCCESS:
            return action.user;
        default:
            return user;
    }
};
