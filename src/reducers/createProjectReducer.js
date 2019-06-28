import * as types from '../actions/actionTypes';

export default function createProject(project = {}, action) {
    switch (action.type) {
        case types.CREATE_PROJECT_SUCCESS:
            return action.project;

        default:
            return project;
    }
};
