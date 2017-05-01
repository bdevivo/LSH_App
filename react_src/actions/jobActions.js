import * as types from './actionTypes';
import jobPostApi from '../api/jobPostApi';
import userApi from '../api/userApi';
import * as authUtils from '../auth_utils/auth';
import * as userActions from './userActions';
import * as jobMaps from '../utils/mappers/jobPostingMapper';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function saveJobSuccess(jobPosting) {
    return {type: types.SAVE_JOB_SUCCESS, jobPosting};
}

export function addJobDisplay(jobPostDisplay) {
    return {type: types.ADD_JOB_DISPLAY, jobPostDisplay};
}

export function updateJobSuccess(jobPosting) {
    return {type: types.UPDATE_JOB_SUCCESS, jobPosting};
}

export function updateJobDisplay(jobPostDisplay) {
    return {type: types.UPDATE_JOB_DISPLAY, jobPostDisplay};
}


export function deleteJobSuccess(jobId) {
    return {type: types.DELETE_JOB_SUCCESS, jobId};
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


export function getJobSummariesForUserSuccess(userJobs, userJobsDisplay) {
    return {type: types.GET_JOBS_FOR_USER_SUCCESS, userJobs, userJobsDisplay};
}

export function getJobDetailsSuccess(jobPosting) {
    return {type: types.GET_JOB_DETAILS_SUCCESS, jobPosting};
}

// THUNKS

export function getJobDashboardData() {

    return function(dispatch, getState) {

        let {loadedData, jobPostsDisplay} = getState();

        if (loadedData.jobPostings) {
            return Promise.resolve(jobPostsDisplay);
        }

        dispatch(beginAjaxCall());
        let allJobPosts;

        let userId = authUtils.getUserId();

        return jobPostApi.getJobSummariesForUser(userId)
            .then(response => {
                allJobPosts = response.jobPostings;


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
            .then(response => {
                dispatch(userActions.getUserNamesSuccess(response.userNames));

                let jobPostsDisplay = jobMaps.mapJobPosts(allJobPosts, response.userNames);
                dispatch(endAjaxCall());
                dispatch(getJobSummariesForUserSuccess(allJobPosts, jobPostsDisplay));
                return jobPostsDisplay;
            })
            .catch(error => {
                dispatch(endAjaxCall());
               // reject(error);   // TODO: add real error handler action
                console.log(error.stack);
            });


    };

}

export function saveJob(jobPosting) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());

        return jobPostApi.saveJob(jobPosting)
            .then(savedJob => {
                dispatch(endAjaxCall());
                savedJob.hasBeenSaved = true;


                let userId = authUtils.getUserId();
                let {profile} = getState();
                let userName = `${profile.user_name.first} ${profile.user_name.last}`;
                let userNames = [{ userId: userId, name: userName }];

                let jobPostDisplay = jobMaps.mapJobPost(savedJob, userNames);
                dispatch(addJobDisplay(jobPostDisplay));

                dispatch(saveJobSuccess(savedJob));

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
                // TODO: check response here
                dispatch(updateJobSuccess(jobPosting));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });
    };
}

export function deleteJob(jobId) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return jobPostApi.deleteJob(jobId)
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(deleteJobSuccess(jobId));
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



