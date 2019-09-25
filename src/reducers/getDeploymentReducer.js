import * as types from '../actions/actionTypes';

export default function getDeployProject(deploymentInformation = null, action) {
    switch (action.type) {
    case types.GET_DEPLOYMENT_PROJECT_SUCCESS:
        return action.deployment;

    default:
        return deploymentInformation;
    }
}
