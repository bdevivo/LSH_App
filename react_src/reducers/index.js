import {combineReducers} from 'redux';
//import {combineReducers} from 'redux-immutable';   // use this when state is an immutable object
import questions from './questionWizardReducer';
import profile from './profileReducer';
import auth from './authReducer';

const rootReducer = combineReducers( {
    // using shorthand property names
    questions,
    profile,
    auth
});

export default rootReducer;
