import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function jobPostReducer(jobPosts = initialState.jobPosts, action) {

    let answerSetType = action.isDraft ? "draftQuestionAnswers" : "questionAnswers";

    const updateJobPost = (jobPost) => {
        let jobIndex = jobPosts.findIndex((x) => x._id === jobPost._id);
        if (jobIndex > -1) {

            return update(jobPosts, {$splice: [[jobIndex, 1, jobPost]]});
        }
        else {
            return jobPosts;
        }
    };

    switch (action.type) {

        case types.SET_QUESTION_ANSWER: {
            let jobIndex = jobPosts.findIndex((x) => x._id === action.jobId);
            if (jobIndex > -1) {
                let newQuestionAnswers = cloneDeep(action.questionAnswer);
                return update(jobPosts, {
                    [jobIndex]: {
                        [answerSetType] : {
                            [action.questionId]: {$set: newQuestionAnswers}
                        }
                    }
                });
            }
            else {
                return jobPosts;
            }
        }

        case types.SET_QUESTION_ANSWERS: {
            let jobIndex = jobPosts.findIndex((x) => x._id === action.jobId);
            if (jobIndex > -1) {
                let newAnswerSet = cloneDeep(action.questionAnswerSet);
                return update(jobPosts, {
                    [jobIndex]: {
                        [answerSetType]: {$set: newAnswerSet}
                    }
                });
            }
            else {
                return jobPosts;
            }
        }

        case types.CLEAR_QUESTION_ANSWERS: {
            let jobIndex = jobPosts.findIndex((x) => x._id === action.jobId);
            if (jobIndex > -1) {
                return update(jobPosts, {
                    [jobIndex]: {
                        [answerSetType]: {$set: {}}
                    }
                });
            }
            else {
                return jobPosts;
            }
        }

        case types.GET_JOBS_FOR_USER_SUCCESS: {
            return update(jobPosts, {$set: action.userJobs});
        }

        case types.GET_JOB_DETAILS_SUCCESS: {
            return updateJobPost(action.jobPosting);
        }

        case types.SAVE_JOB_SUCCESS: {
           return update(jobPosts, {$push: [action.jobPosting]});
        }

        case types.DELETE_JOB_SUCCESS: {
            let oldJobIndex = jobPosts.findIndex((x) => x._id === action.jobId);
            if (oldJobIndex > -1) {
                return update(jobPosts, {$splice: [[oldJobIndex, 1]]});
            }
            else {
                return jobPosts;
            }
        }

        case types.UPDATE_JOB_SUCCESS: {
            return updateJobPost(action.jobPosting);
        }

        default:
            return jobPosts;
    }
}
