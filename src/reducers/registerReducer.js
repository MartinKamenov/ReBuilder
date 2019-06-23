import * as types from '../actions/actionTypes';

export default function registerReducer(user = {}, action) {
    switch (action.type) {
        case types.REGISTER_SUCCESS:
            return action.user;

        default:
            return user;
    }
};
