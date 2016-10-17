import {combineReducers} from 'redux-immutable';    // need to use combineReducers from "redux-immutable" because our state is an immutable object
import questions from './questionWizardReducer';

const rootReducer = combineReducers( {
    // using shorthand property names
    questions
});

export default rootReducer;
