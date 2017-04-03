import React, {PropTypes} from 'react';
import {Row, Col, Button, Modal, Panel} from 'react-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import * as jobHelpers from '../../../utils/jobHelpers';
import * as enums from '../../../utils/enums';
import CSSModules from 'react-css-modules';
import styles from '../JobPosting.css';

const JobDetails = ({job, jobDetails, modalVisible, onCloseModal, allQuestions}) => {
    let questionAnswers = jobHelpers.getJobAnswers(job);

    // sort answers into the order in which they were answered
    let orderedQuestions = questionHelpers.gertOrderedQuestionAnswers(allQuestions, questionAnswers, job.orderedQuestions);

    // remove the Name question, which is shown elsewhere
    let {QUESTION_FUNCTION} = enums;
    let nameQuestion = allQuestions.find(q => q.function === QUESTION_FUNCTION.JobName);
    let orderedNameQuestionIndex = orderedQuestions.findIndex(x => x.question._id === nameQuestion._id);
    if (orderedNameQuestionIndex > -1) {
        orderedQuestions.splice(orderedNameQuestionIndex, 1);
    }


    let orderedQuestionItems = orderedQuestions.map(qItem => {
        return (<p key={qItem.question._id}><b>{qItem.question.name}: </b>{qItem.answerString}</p>);
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
                <Row>
                    <Col md={5}>
                        <p><strong>Name: </strong>{jobDetails.name}</p>
                        <p><strong>Status: </strong>{jobDetails.status}</p>
                        <p><strong>Created: </strong>{jobDetails.createdDate}</p>
                        <p><strong>Created By: </strong>{jobDetails.createdBy}</p>
                        {postedData}
                    </Col>

                    <Col md={7}>
                        <Panel header="Question Answers" styleName="questionPanel">
                            <div styleName="questionItems">
                                {orderedQuestionItems}
                            </div>
                        </Panel>
                    </Col>
                </Row>
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


