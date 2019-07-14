import * as types from './actionTypes';
import apiService from '../service/api.service';
import { error as toastError } from 'react-toastify-redux';
import { createError } from './errorActions';

export function deployProject(projectId, token) {
    return async function(dispatch) {
        try {
            const res = await apiService.deployProject(projectId, token);
            const projectStatus = res.data;
            debugger;
            return dispatch(deployProjectSuccess(projectStatus));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function deployProjectSuccess(projectStatus) {
    return { type: types.DEPLOY_PROJECT_SUCCESS, projectStatus };
}
