import { combineReducers } from 'redux';
// import initialState from './initialState';
import user from './loginReducer';
import project from './createProjectReducer';
import {toastsReducer as toasts} from 'react-toastify-redux';

const rootReducer = combineReducers({
    user,
    project,
    toasts
});

export default rootReducer;