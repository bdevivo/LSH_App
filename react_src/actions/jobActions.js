import * as types from './actionTypes';
import * as jobPostApi from '../api/jobPostApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function saveJobSuccess(jobPosting) {
    return {type: types.SAVE_JOB_SUCCESS, jobPosting};
}

export function updateJobSuccess(jobPosting) {
    return {type: types.UPDATE_JOB_SUCCESS, jobPosting};
}

export function setQuestionAnswer(jobId, questionAnswer) {
    return {type: types.SET_QUESTION_ANSWER, questionId, questionAnswer, gridName};
}

export function setQuestionAnswers(jobId, questionAnswerSet) {
    return {type: types.SET_QUESTION_ANSWERS, jobId, questionAnswerSet};
}

export function clearQuestionAnswers(jobId) {
    return {type: types.CLEAR_QUESTION_ANSWERS, jobId};
}

export function getJobSummariesForUserSuccess(userJobs) {
    return {type: types.GET_JOBS_FOR_USER_SUCCESS, userJobs};
}

export function getJobDetailsSuccess(jobPost) {
    return {type: types.GET_JOB_DETAILS_SUCCESS, jobPost};
}

// THUNKS

export function saveJob(jobPosting) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.saveJob(jobPosting)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(saveJobSuccess(response));
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
                dispatch(updateJobSuccess(response));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}

export function getJobSummariesForUser(userId) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.getJobSummariesForUser(userId)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(getJobSummariesForUserSuccess(response.userJobs));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}

export function getJobDetails(jobId) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.getJobDetails(jobId)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(getJobDetailsSuccess(response.jobPost));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}



