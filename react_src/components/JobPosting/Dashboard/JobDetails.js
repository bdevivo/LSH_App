import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import * as jobHelpers from '../../../utils/jobHelpers';
import CSSModules from 'react-css-modules';
import styles from '../JobPosting.css';

const JobDetails = ({job, jobDetails, modalVisible, onCloseModal, allQuestions}) => {


    let questionAnswers = (jobHelpers.isJobPosted(job) ? job.questionAnswers : job.draftQuestionAnswers);
    let questionItems = [];
    Object.keys(questionAnswers).forEach((key) => {
        let question = allQuestions.find(x => x._id === key);
        if (question) {
            let answerString = questionHelpers.getQuestionAnswer(question, questionAnswers[key]);

            if (answerString) {
                questionItems.push(<p key={question._id}><strong>{question.name}: </strong>{answerString}</p>);
            }
        }
    });

    let postedData = jobHelpers.isJobPosted(job)
        ? (<span>
            <p><strong>Posted: </strong>{jobDetails.postedDate}</p>
            <p><strong>Posted By: </strong>{jobDetails.postedBy}</p>
        </span>)
        : null;

    return (
        <Modal backdrop="static" dialogClassName="jobDetailsModal" show={modalVisible} onHide={onCloseModal}>

            <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <p><strong>Name: </strong>{jobDetails.name}</p>
                    <p><strong>Status: </strong>{jobDetails.status}</p>
                    <p><strong>Created: </strong>{jobDetails.createdDate}</p>
                    <p><strong>Created By: </strong>{jobDetails.createdBy}</p>
                    {postedData}
                    {questionItems}
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onCloseModal}>OK</Button>
            </Modal.Footer>

        </Modal>
    )
        ;
};


JobDetails.propTypes = {
    job: PropTypes.object.isRequired,
    jobDetails: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    allQuestions: PropTypes.array.isRequired,
};

export default CSSModules(JobDetails, styles);

