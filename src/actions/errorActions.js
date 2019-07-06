import * as types from './actionTypes';

export function createError(error) {
    return { type: types.CREATE_ERROR, error };
}