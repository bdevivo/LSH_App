import * as types from './actionTypes';
import jobPostApi from '../api/jobPostApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function saveJobSuccess(jobPosting) {
    return {type: types.SAVE_JOB_SUCCESS, jobPosting};
}

export function updateJobSuccess(jobPosting) {
    return {type: types.UPDATE_JOB_SUCCESS, jobPosting};
}

export function postJobSuccess(jobPosting) {
    return {type: types.POST_JOB_SUCCESS, jobPosting};
}

export function cancelJobSuccess(jobPosting) {
    return {type: types.CANCEL_JOB_SUCCESS, jobPosting};
}

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

export function saveJob(jobPosting) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.saveJob(jobPosting)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(saveJobSuccess(response.jobPosting));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}

export function updateJob(jobPosting) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.updateJob(jobPosting)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(updateJobSuccess(response.jobPosting));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}

export function postJob(jobPosting) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.postJob(jobPosting)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(postJobSuccess(response.jobPosting));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}

export function cancelJob(jobPosting) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.cancelJob(jobPosting)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(cancelJobSuccess(response.jobPosting));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}