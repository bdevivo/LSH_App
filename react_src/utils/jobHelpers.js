import * as enums from './enums';
const dateFormat = require('dateformat');

export function isJobPosted(job) {
    let {JOB_STATUS} = enums;
    return job.status === JOB_STATUS.PostedPrivate
        || job.status === JOB_STATUS.PostedPublic
        || job.status === JOB_STATUS.PostedUsersOnly;
}


export function getJobName(jobPost, allQuestions) {
    let {QUESTION_FUNCTION, JOB_STATUS, JOB_STATUS_DISPLAY} = enums;
    let answers = jobPost.status === JOB_STATUS.Draft ? jobPost.draftQuestionAnswers : jobPost.questionAnswers;

    let nameQuestion = allQuestions.find(q => q.function === QUESTION_FUNCTION.JobName);
    let nameAnswer = nameQuestion && answers.hasOwnProperty(nameQuestion._id) ? answers[nameQuestion._id] : null;
    return nameAnswer || "[No name provided]";
}

export function getJobDisplayData(jobPost, jobUserNames) {
    let {JOB_STATUS_DISPLAY} = enums;

    let jobData = {
        jobId: jobPost._id
    };

    jobData.name = jobPost.name || "[No name provided]";
    jobData.status = JOB_STATUS_DISPLAY[jobPost.status];
    jobData.createdDate = jobPost.createdDate ? dateFormat(jobPost.createdDate, "mmmm dS, yyyy, h:MM TT") : "";
    jobData.postedDate = jobPost.postedDate ? dateFormat(jobPost.postedDate, "mmmm dS, yyyy, h:MM TT") : "Not posted";

    let createdBy = jobUserNames.find(x => x.userId === jobPost.createdBy);
    jobData.createdBy = createdBy ? createdBy.name : "";

    let postedBy = jobUserNames.find(x => x.userId === jobPost.postedBy);
    jobData.postedBy =  postedBy ? postedBy.name : "";

    return jobData;
}
