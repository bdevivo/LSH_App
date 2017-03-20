import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './JobPosting.css';

const JobDashboard = ({jobPostings, onViewJob, onEditJob, onDeleteJob, postClicked, visibilityClicked}) => {

   let jobTableHeaderRow = (
      <tr key="head">
         <th>Name</th>
         <th>Status</th>
         <th>Posted</th>
         <th>Actions</th>
      </tr>);

   const test = (status, jobId) => {
      return "";
   };

   const getActions = (status, jobId) => {
      return "";
   };

   const temp = (status, jobId) => {
      return (<span>
         <Button type="button" className="btn btn-xs btn-default" aria-label="View" onClick={() => onViewJob(jobId)}>
            <span className="glyphicon glyphicon-eye-open"></span>
         </Button>
         {' '}
         <Button type="button" className="btn btn-xs btn-default" aria-label="Edit" onClick={() => onEditJob(jobId)}>
            <span className="glyphicon glyphicon-pencil"></span>
         </Button>
         {' '}
         <Button type="button" className="btn btn-xs btn-default" aria-label="Delete" onClick={() => onDeleteJob(jobId)}>
            <span className="glyphicon glyphicon-remove"></span>
         </Button>

      </span>);
   };

   let jobTableRows = jobPostings.map(job => {
      return (
         <tr key={job.jobId}>
            <td>{job.name}</td>
            <td>{job.status}</td>
            <td>{job.postedDate}</td>
            <td>{getActions(job.status, job.jobId)}</td>
         </tr>
      );
   });

   let jobPostingNode = jobPostings.length === 0
      ? <p>No job postings found.</p>
      :
      <table className="table table-striped .table-hover">
         <thead>
         {jobTableHeaderRow}
         </thead>
         <tbody>
         {jobTableRows}
         </tbody>
      </table>;


   return (
      <div>

         <Row styleName="headerRow">
            <Col md={10} styleName="">
               <h2>Job Dashboard</h2>
            </Col>

            <Col md={2} styleName="newJobCol">
               <LinkContainer to="/postjobgrid/post">
                  <Button type="button" className="btn-sm btn-default" styleName="">Create New Job...</Button>
               </LinkContainer>
            </Col>

         </Row>

         <Row styleName="">

            <Col md={12} styleName="">
               {jobPostingNode}
            </Col>


         </Row>
      </div>
   );
};


JobDashboard.propTypes = {
   jobPostings: PropTypes.array.isRequired,
   onViewJob: PropTypes.func.isRequired,
   onEditJob: PropTypes.func.isRequired,
   onDeleteJob: PropTypes.func.isRequired,
   postClicked: PropTypes.func.isRequired,
   visibilityClicked: PropTypes.func.isRequired,
};

export default CSSModules(JobDashboard, styles);


