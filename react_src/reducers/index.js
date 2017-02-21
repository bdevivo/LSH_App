import {combineReducers} from 'redux';
import questions from './questionReducer';
import questionPanels from './questionPanelReducer';
import questionSets from './questionSetReducer';
import questionGrids from './questionGridReducer';
import profile from './profileReducer';
import auth from './authReducer';
import ui from './uiReducer';
import loadedData from './loadedDataReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers( {
    // using shorthand property names
    questions,
    questionPanels,
    questionSets,
    questionGrids,
    profile,
    auth,
    ui,
    loadedData,
    ajaxCallsInProgress
});

export default rootReducer;
