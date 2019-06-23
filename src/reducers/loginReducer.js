import * as types from '../actions/actionTypes';

export default function loginReducer(user = {}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return action.user;

        default:
            return user;
    }
};
