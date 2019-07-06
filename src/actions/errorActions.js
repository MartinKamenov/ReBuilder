import * as types from './actionTypes';
import uuid from 'uuid';

export function createError(error) {
    return { type: types.CREATE_ERROR, error: { message: error, id: uuid.v1() }};
}