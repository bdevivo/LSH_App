import * as enums from './enums';


export function isJobPosted(job) {
   let {JOB_STATUS} = enums;
   return job.status === JOB_STATUS.PostedPrivate
      || job.status === JOB_STATUS.PostedPublic
      || job.status === JOB_STATUS.PostedUsersOnly;
}
