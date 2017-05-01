import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function jobPostReducer(jobPostsDisplay = initialState.jobPostsDisplay, action) {

    const updateJobPostDisplay = (jobPostDisplay) => {
        let jobIndex = jobPostsDisplay.findIndex((x) => x._id === jobPostDisplay._id);
        if (jobIndex > -1) {
            return update(jobPostDisplay, {$splice: [[jobIndex, 1, jobPostDisplay]]});
        }
        else {
            return jobPostDisplay;
        }
    };

    switch (action.type) {


        case types.GET_JOBS_FOR_USER_SUCCESS: {
            return update(jobPostsDisplay, {$set: action.userJobsDisplay});
        }

        case types.ADD_JOB_DISPLAY: {
            return update(jobPostsDisplay, {$push: [action.jobPostDisplay]});
        }

        case types.DELETE_JOB_SUCCESS: {
            let oldJobIndex = jobPostsDisplay.findIndex((x) => x._id === action.jobId);
            if (oldJobIndex > -1) {
                return update(jobPostsDisplay, {$splice: [[oldJobIndex, 1]]});
            }
            else {
                return jobPostsDisplay;
            }
        }

        case types.UPDATE_JOB_SUCCESS: {
            return updateJobPostDisplay(action.jobPostDisplay);
        }

        default:
            return jobPostsDisplay;
    }
}
