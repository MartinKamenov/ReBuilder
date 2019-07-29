import * as types from '../actions/actionTypes';

export default function createProject(project = {}, action) {
    switch (action.type) {
    case types.SELECT_PROJECT_SUCCESS:
        return action.project;

    default:
        return project;
    }
}
