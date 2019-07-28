import * as types from '../actions/actionTypes';

export default function createError(error = null, action) {
    switch (action.type) {
    case types.CREATE_ERROR:
        return action.error;

    default:
        return error;
    }
}
