import { combineReducers } from 'redux';
// import initialState from './initialState';
import user from './updateUserReducer';
import project from './selectProjectReducer';
import projectStatus from './deployProjectReducer';
import error from './errorReducer';
import { toastsReducer as toasts } from 'react-toastify-redux';

const rootReducer = combineReducers({
    user,
    project,
    projectStatus,
    toasts,
    error
});

export default rootReducer;