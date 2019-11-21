import * as types from './actionTypes';
import apiService from '../service/api.service';
import { error as toastError, success as toastSuccess } from 'react-toastify-redux';
import { createError } from './errorActions';
import successMessages from '../constants/successMessages';

export function createProject(projectName, projectUrl, description, token, project) {
    return async function(dispatch) {
        try {
            const res = await apiService
                .createProject(projectName, projectUrl, description, token, project);
            const savedProject = res.data;
            dispatch(toastSuccess(successMessages.PROJECT_CREATED));
            return dispatch(selectProjectSuccess(savedProject));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function updateProjectInformation(id, projectName, projectUrl, description, token, project) {
    return async function(dispatch) {
        try {
            const res = await apiService
                .updateProjectInformation(id, projectName, projectUrl, description, token, project);
            const savedProject = res.data;
            dispatch(toastSuccess(successMessages.PROJECT_CREATED));
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
                dispatch(toastSuccess(successMessages.PROJECT_SAVED));
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

export function deleteProject(projectId, token) {
    return async function(dispatch) {
        try {
            await apiService.deleteProject(projectId, token);
            dispatch(toastSuccess(successMessages.PROJECT_DELETED));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function selectProjectSuccess(project) {
    return { type: types.SELECT_PROJECT_SUCCESS, project };
}
