import * as types from './actionTypes';
import apiService from '../service/api.service';

export function createProject(projectName, projectUrl, token) {
    return async function(dispatch) {
        const res = await apiService.createProject(projectName, projectUrl, token);
        const project = res.data;
        return dispatch(selectProjectSuccess(project));
    };
}

export function selectProjectSuccess(project) {
    return { type: types.SELECT_PROJECT_SUCCESS, project };
}