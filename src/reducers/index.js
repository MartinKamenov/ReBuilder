import { combineReducers } from 'redux';
// import initialState from './initialState';
import user from './loginReducer';
import project from './createProjectReducer';
import error from './errorReducer';
import { toastsReducer as toasts } from 'react-toastify-redux';

const rootReducer = combineReducers({
    user,
    project,
    toasts,
    error
});

export default rootReducer;