import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './JobPosting.css';

const JobDashboard = ({jobPostings}) => {

   let jobTableHeaderRow = (
      <tr>
         <td>Name</td>
         <td>Status</td>
         <td>Posted</td>
      </tr>);

   let jobTableRows = jobPostings.map(job => {
      return (
         <tr key={job.jobId}>
            <td>{job.name}</td>
            <td>{job.status}</td>
            <td>{job.postedDate}</td>
         </tr>
      );
   });

   let jobPostingNode = jobPostings.length === 0
      ? <p>No job postings found.</p>
      :
      <table>
         {jobTableHeaderRow}
         {jobTableRows}
      </table>;


   return (
      <div>
         <h2>Job Dashboard</h2>

         <Row styleName="">

            <Col md={10} styleName="">
               {jobPostingNode}
            </Col>

            <Col md={2} styleName="">
               <LinkContainer to="/postjobgrid/post">
                  <Button type="button" className="btn btn-default" styleName="">New Job Posting...</Button>
               </LinkContainer>
            </Col>


         </Row>
      </div>
   );
};


JobDashboard.propTypes = {
   jobPostings: PropTypes.array.isRequired,

};

export default CSSModules(JobDashboard, styles);


