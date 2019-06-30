import * as types from './actionTypes';
import apiService from '../service/api.service';

export function createProject(projectName, projectUrl) {
    return async function(dispatch) {
        debugger;
        const res = await apiService.createProject(projectName, projectUrl);
        const project = res.data;
        return dispatch(createProjectSuccess(project));
    };
}

export function createProjectSuccess(project) {
    return { type: types.CREATE_PROJECT_SUCCESS, project };
}