import * as types from './actionTypes';
import apiService from '../service/api.service';
import { error as toastError } from 'react-toastify-redux';
import { createError } from './errorActions';

export function createProject(projectName, projectUrl, token) {
    return async function(dispatch) {
        try {
            const res = await apiService.createProject(projectName, projectUrl, token);
            const project = res.data;
            return dispatch(selectProjectSuccess(project));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function updateProject(projectId, components, token) {
    return async function(dispatch) {
        try {
            let res;
            if(components) {
                await apiService.updateProject(projectId, components, token);
            } else {
                res = await apiService.getProject(projectId, token);
                const project = res.data;
                return dispatch(selectProjectSuccess(project));
            }
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function selectProjectSuccess(project) {
    return { type: types.SELECT_PROJECT_SUCCESS, project };
}
