import React, {Component, PropTypes} from 'react';
import JobActionButton from './JobActionButton';
import * as enums from '../../../utils/enums';
import * as jobHelpers from '../../../utils/jobHelpers';
import CSSModules from 'react-css-modules';
import styles from '../JobPosting.css';

const JobActionButtons = ({job, onViewJob, onEditJob, onDeleteJob, onPostJob, onChangeJobVisibility}) => {

   let status = job.status;
   let jobId = job._id;
   let {JOB_STATUS} = enums;

   return (
      <span>

         <JobActionButton label="View" clickHandler={onViewJob} jobId={jobId} glyphName="eye-open" isFirst={true} />
         <JobActionButton label="Edit" clickHandler={onEditJob} jobId={jobId} glyphName="pencil" isFirst={false} />
         <JobActionButton label="Delete" clickHandler={onDeleteJob} jobId={jobId} glyphName="remove" isFirst={false} />

         {status === JOB_STATUS.Draft &&
            <JobActionButton label="Post" clickHandler={onPostJob} jobId={jobId} glyphName="flash" isFirst={false} />}

         {jobHelpers.isJobPosted(job) &&
            <JobActionButton label="Change Visibility of Post" clickHandler={onChangeJobVisibility} jobId={jobId} glyphName="sunglasses" isFirst={false} />}


      </span>
   );
};


JobActionButtons.propTypes = {
   job: PropTypes.object.isRequired,
   onViewJob: PropTypes.func.isRequired,
   onEditJob: PropTypes.func.isRequired,
   onDeleteJob: PropTypes.func.isRequired,
   onPostJob: PropTypes.func.isRequired,
   onChangeJobVisibility: PropTypes.func.isRequired,
};

export default CSSModules(JobActionButtons, styles);


