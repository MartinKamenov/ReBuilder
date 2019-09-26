import * as types from './actionTypes';
import apiService from '../service/api.service';
import { error as toastError } from 'react-toastify-redux';
import { createError } from './errorActions';

export function getDeployment(projectId, token) {
    return async function(dispatch) {
        try {
            const res = await apiService
                .getDeploymentInformation(projectId, token);
            const deploymentInformation = res.data;
            return dispatch(getDeploymentSuccess(deploymentInformation));
        } catch(error) {
            dispatch(toastError(error.message));
            return dispatch(createError(error.message));
        }
    };
}

export function getDeploymentSuccess(deployment) {
    return { type: types.GET_DEPLOYMENT_PROJECT_SUCCESS, deployment };
}