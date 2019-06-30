import { combineReducers } from 'redux';
// import initialState from './initialState';
import user from './loginReducer';
import project from './createProjectReducer';

const rootReducer = combineReducers({
    user,
    project
});

export default rootReducer;