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
            .then(response => {
                dispatch(endAjaxCall());
                let sortedQuestions = response.questions.sort((a, b) => { return a.index - b.index; });
                dispatch(loadQuestionsSuccess(sortedQuestions));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
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
       questionApi.updateQuestion(question)
          .then(response => {
             console.log(response.message);
             dispatch(updateQuestionSuccess(question));
          });
    };
}

export function removeQuestion(questionId) {
    return function(dispatch) {
       questionApi.deleteQuestion(questionId)
          .then(response => {
             console.log(response.message);
             dispatch(removeQuestionSuccess(questionId));
          });
    };
}
