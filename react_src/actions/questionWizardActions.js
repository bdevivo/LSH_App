import * as types from './actionTypes';
import questionApi from '../api/mockQuestionApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function toggleQuestion(questionID) {
   //debugger;
   return { type: types.TOGGLE_QUESTION, questionID};
}

export function loadQuestionsSuccess(questions) {
    //debugger;
    return { type: types.LOAD_QUESTIONS_SUCCESS, questions};
}

// THUNKS

export function getAllQuestions() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return questionApi.getAllQuestions()
            .then(questions => {
                dispatch(endAjaxCall());
                dispatch(loadQuestionsSuccess(questions));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                throw(error);   // TODO: add real error handler action
            });
    };
}