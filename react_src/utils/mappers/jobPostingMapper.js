import * as enums from '../constants/enums';
const dateFormat = require('dateformat');

const autoMapper = require('automapper-ts');
let {JOB_STATUS_DISPLAY} = enums;

const MAP_SOURCE_TYPE = {
    jobPosting: 'jobPostSource',
    question: 'questionSource'

};

const MAP_DESTINATION_TYPE = {
    jobPosting: 'jobPostDest',
    question: 'questionDest'

};


export function createMaps() {
    autoMapper
        .createMap(MAP_SOURCE_TYPE.jobPosting, MAP_DESTINATION_TYPE.jobPosting)
        .forMember('jobId', opts => { return opts.mapFrom('_id'); })
        .forMember('name', opts => { return opts.sourceObject.name || "[No name provided]"; })
        .forMember('status', opts => { return JOB_STATUS_DISPLAY[opts.sourceObject.status]; })
        .forMember('createdDate', opts => { return opts.sourceObject.createdDate ? dateFormat(opts.sourceObject.createdDate, "mmmm dS, yyyy, h:MM TT") : ""; })
        .forMember('createdBy', opts => { return opts.mapFrom('createdByDisplay'); })
        .forMember('postedDate', opts => { return opts.sourceObject.postedDate ? dateFormat(opts.sourceObject.postedDate, "mmmm dS, yyyy, h:MM TT") : ""; })
        .forMember('postedBy', opts => { return opts.mapFrom('postedByDisplay'); });

}

export function mapJobPost(jobPost, jobUserNames) {

    // we need to pre-map the properties involving usernames, since they depend on the jobUserNames lookup table
    //let createdBy = jobUserNames.find(x => x.userId === jobPost.createdBy);
    jobPost.createdByDisplay = jobUserNames.find(x => x.userId === jobPost.createdBy) ? createdBy.name : "";

    //let postedBy = jobUserNames.find(x => x.userId === jobPost.postedBy);
    jobPost.postedByDisplay =  jobUserNames.find(x => x.userId === jobPost.postedBy) ? postedBy.name : "";


    return autoMapper.map(MAP_SOURCE_TYPE.jobPosting, MAP_DESTINATION_TYPE.jobPosting, jobPost);
}
