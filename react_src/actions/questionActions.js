import * as types from './actionTypes';
import questionApi from '../api/questionApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function loadQuestionsSuccess(questions) {
    return { type: types.LOAD_QUESTIONS_SUCCESS, questions};
}

export function addQuestionSuccess(question) {
    return { type: types.ADD_QUESTION_SUCCESS, question};
}

export function updateQuestionSuccess(question) {
    return { type: types.UPDATE_QUESTION_SUCCESS, question};
}

export function removeQuestionSuccess(questionId) {
    return { type: types.REMOVE_QUESTION_SUCCESS, questionId};
}

// THUNKS

export function getAllQuestions() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return questionApi.getAllQuestions()
            .then(questions => {
                dispatch(endAjaxCall());
                dispatch(loadQuestionsSuccess(questions.questions));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                throw(error);   // TODO: add real error handler action
            });
    };
}

export function addQuestion(question) {
    return function(dispatch) {
        questionApi.addQuestion(question)
            .then(q => {
                dispatch(addQuestionSuccess((q)));
            });
    };
}

export function updateQuestion(question) {
    return function(dispatch) {
        // TODO: call question API
        dispatch(updateQuestionSuccess(question));
    };
}

export function removeQuestion(questionId) {
    return function(dispatch) {
        // TODO: call question API
        dispatch(removeQuestionSuccess(questionId));
    };
}