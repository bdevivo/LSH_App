import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import * as jobHelpers from '../../../utils/jobHelpers';
import JobActionButtons from './JobActionButtons';
import CSSModules from 'react-css-modules';
import styles from '../JobPosting.css';

const JobDashboard = ({jobPostings, jobDetails, onViewJob, onEditJob, onDeleteJob, onPostJob, onChangeVisibility}) => {

    let jobTableHeaderRow = (
        <tr key="head">
            <th>Name</th>
            <th>Status</th>
            <th>Posted</th>
            <th>Actions</th>
            <th>View Matches</th>
        </tr>);


    let jobTableRows = jobPostings.map(job => {

        let jobDisplay = jobDetails.find(x => x.jobId === job._id);

        return (
            <tr key={job._id}>
                <td>{jobDisplay.name}</td>
                <td>{jobDisplay.status}</td>
                <td>{jobDisplay.postedDate}</td>
                <td>
                    <JobActionButtons
                        job={job}
                        onViewJob={onViewJob}
                        onEditJob={onEditJob}
                        onDeleteJob={onDeleteJob}
                        onPostJob={onPostJob}
                        onChangeJobVisibility={onChangeVisibility}/>
                </td>
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
    jobDetails: PropTypes.array.isRequired,
    onViewJob: PropTypes.func.isRequired,
    onEditJob: PropTypes.func.isRequired,
    onDeleteJob: PropTypes.func.isRequired,
    onPostJob: PropTypes.func.isRequired,
    onChangeVisibility: PropTypes.func.isRequired,
};

export default CSSModules(JobDashboard, styles);


