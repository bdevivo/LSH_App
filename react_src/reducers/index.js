import {combineReducers} from 'redux';
import questions from './questionReducer';
import questionPanels from './questionPanelReducer';
import questionSets from './questionSetReducer';
import jobPosts from './jobPostReducer';
import jobPostsDisplay from './jobPostDisplayReducer';
import profile from './profileReducer';
import auth from './authReducer';
import ui from './uiReducer';
import users from './userReducer';
import loadedData from './loadedDataReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers( {
    // using shorthand property names
    questions,
    questionPanels,
    questionSets,
    jobPosts,
    jobPostsDisplay,
    profile,
    auth,
    ui,
    users,
    loadedData,
    ajaxCallsInProgress
});

export default rootReducer;
