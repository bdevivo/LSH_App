import * as types from './actionTypes';
import questionAnswerApi from '../api/questionGridApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function setQuestionAnswer(questionId, questionAnswer, gridName) {
    return {type: types.SET_QUESTION_ANSWER, questionId, questionAnswer, gridName};
}

export function setQuestionAnswers(questionAnswers, gridName) {
    return {type: types.SET_QUESTION_ANSWERS, questionAnswers, gridName};
}

export function loadQuestionAnswersSuccess(questionGrids) {
    return {type: types.LOAD_QUESTION_ANSWERS_SUCCESS, questionGrids};
}

export function clearQuestionAnswers(gridName) {
    return {type: types.CLEAR_QUESTION_ANSWERS, gridName};
}



// THUNKS

export function getAllQuestionAnswers() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return questionAnswerApi.getAllQuestionAnswers()
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(loadQuestionAnswersSuccess(response.questionGrids));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}