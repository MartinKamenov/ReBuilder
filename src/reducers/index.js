import { combineReducers } from 'redux';
// import initialState from './initialState';
import user from './loginReducer';

const rootReducer = combineReducers({
    user
});

export default rootReducer;