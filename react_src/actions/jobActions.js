import * as types from './actionTypes';
import jobPostApi from '../api/jobPostApi';
import userApi from '../api/userApi';
import * as authUtils from '../auth_utils/auth';
import * as userActions from './userActions';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function saveJobSuccess(jobPosting) {
    return {type: types.SAVE_JOB_SUCCESS, jobPosting};
}

export function updateJobSuccess(jobPosting) {
    return {type: types.UPDATE_JOB_SUCCESS, jobPosting};
}

export function setQuestionAnswer(jobId, questionAnswer) {
    return {type: types.SET_QUESTION_ANSWER, jobId, questionAnswer};
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

export function getJobDetailsSuccess(jobPosting) {
    return {type: types.GET_JOB_DETAILS_SUCCESS, jobPosting};
}

// THUNKS

export function saveJob(jobPosting) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.saveJob(jobPosting)
            .then(response => {
                dispatch(endAjaxCall());
                response.hasBeenSaved = true;
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

export function getJobDashboardData() {
    let userId = authUtils.getUserId();
    return function(dispatch) {
        dispatch(beginAjaxCall());

        return jobPostApi.getJobSummariesForUser(userId)
            .then(response => {
                let allJobPosts = response.jobPostings;
                dispatch(getJobSummariesForUserSuccess(allJobPosts));

                let jobUserIds = [];
                allJobPosts.forEach((job) => {
                    if (job.createdBy && !jobUserIds.includes(job.createdBy)) {
                        jobUserIds.push(job.createdBy);
                    }
                    if (job.postedBy && !jobUserIds.includes(job.postedBy)) {
                        jobUserIds.push(job.postedBy);
                    }
                });

                return userApi.getUserNames(jobUserIds);

            })
            .then(userNames => {
                dispatch(userActions.getUserNamesSuccess(userNames));
                dispatch(endAjaxCall());
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

                dispatch(getJobSummariesForUserSuccess(response.jobPostings));
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



