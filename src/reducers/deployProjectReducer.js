import * as types from '../actions/actionTypes';

export default function deployProject(projectStatus = null, action) {
    switch (action.type) {
    case types.DEPLOY_PROJECT_SUCCESS:
        return action.projectStatus;

    default:
        return projectStatus;
    }
}
