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
        .forMember('name', opts => { return opts.sourceObject.name || "[No name provided]"; })
        .forMember('status', opts => { return JOB_STATUS_DISPLAY[opts.sourceObject.status]; });
}

export function mapJobPost(jobPost) {
    return autoMapper.map(MAP_SOURCE_TYPE.jobPosting, MAP_DESTINATION_TYPE.jobPosting, jobPost);
}
