import * as types from './actionTypes';
import apiService from '../service/api.service';
import { error as toastError, success as toastSuccess } from 'react-toastify-redux';
import { createError } from './errorActions';

export function createProject(projectName, projectUrl, token, project) {
    return async function(dispatch) {
        try {
            const res = await apiService
                .createProject(projectName, projectUrl, token, project);
            const savedProject = res.data;
            dispatch(toastSuccess('Project was created'));
            return dispatch(selectProjectSuccess(savedProject));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function updateProject(projectId, pages, token) {
    return async function(dispatch) {
        try {
            let res;
            if(pages) {
                await apiService.updateProject(projectId, pages, token);
                dispatch(toastSuccess('Project was saved'));
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
