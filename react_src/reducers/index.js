import {combineReducers} from 'redux';
import questions from './questionReducer';
import profile from './profileReducer';
import auth from './authReducer';
import ui from './uiReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers( {
    // using shorthand property names
    questions,
    profile,
    auth,
    ui,
    ajaxCallsInProgress
});

export default rootReducer;
