import store from '../index';
import {beginAjaxCall, endAjaxCall} from '../actions/ajaxStatusActions';
import jobPostApi from '../api/jobPostApi';
import userApi from '../api/userApi'
import * as authUtils from '../auth_utils/auth';
import * as jobActions from '../actions/jobActions';
import * as userActions from '../actions/userActions';

import * as jobHelpers from '../utils/helpers/jobHelpers';
import * as jobMaps from '../utils/mappers/jobPostingMapper';





export function getJobDashboardData() {

    let state = store.state;
    let userId = authUtils.getUserId();

    return new Promise((resolve, reject) => {

        if (state.loadedData.jobPostings) {
            resolve(state.jobPostsDisplay);
        }

        store.dispatch(beginAjaxCall());
        let allJobPosts;

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
            .then(userNames => {
                store.dispatch(userActions.getUserNamesSuccess(userNames));

                let jobUserNames = userNames.map(x => {
                    let userName = x.hasOwnProperty('user_name') ? `${x.user_name.first} ${x.user_name.last}` : '[no name provided]';
                    return {
                        userId: x.auth0_id,
                        name: userName
                    };
                });

                let jobPostsDisplay = allJobPosts.map(post => { return jobMaps.mapJobPost(post, jobUserNames); });
                store.dispatch(endAjaxCall());
                store.dispatch(jobActions.getJobSummariesForUserSuccess(allJobPosts, jobPostsDisplay));
                resolve(jobPostsDisplay);
            })
            .catch(error => {
                store.dispatch(endAjaxCall());
                //throw(error);   // TODO: add real error handler action
                console.log(error.stack);
            });


    }



}

export function getJobSummariesForUser(userId) {

    store.dispatch(beginAjaxCall());
    return jobPostApi.getJobSummariesForUser(userId)
        .then(response => {
            store.dispatch(endAjaxCall());

            store.dispatch(jobActions.getJobSummariesForUserSuccess(response.jobPostings));
        })
        .catch(error => {
            store.dispatch(endAjaxCall());
            //throw(error);   // TODO: add real error handler action
            console.log(error.stack);
        });

}

