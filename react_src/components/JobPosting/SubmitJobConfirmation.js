import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import * as enums from '../../utils/enums';


const SubmitJobConfirmation = ({onPostingTimeChanged, onPostVisibilityChanged, postingTime, postVisibility, onPostJob}) => {

    let {JOB_POST_TIME, JOB_STATUS} = enums;
    
    const postVisibilityDiv = (postingTime === 'now')
        ? <div>
            <h3>Who can see this job posting?</h3>
            <Col md={6}>
                <Radio value={JOB_STATUS.PostedPrivate} checked={postVisibility === JOB_STATUS.PostedPrivate}
                       onChange={onPostVisibilityChanged}>Only people I invite</Radio>

                <Radio value={JOB_STATUS.PostedUsersOnly} checked={postVisibility === JOB_STATUS.PostedUsersOnly}
                       onChange={onPostVisibilityChanged}>Anyone with a LifeSciHub account</Radio>

                <Radio value={JOB_STATUS.PostedPublic} checked={postVisibility === JOB_STATUS.PostedPublic}
                       onChange={onPostVisibilityChanged}>Anyone</Radio>
            </Col>
        </div>
        : null;
    
    return (
        
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Post Job</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3>Would you like to post your job now?</h3>
                <FormGroup controlId="formControlsPostNowOrLater">

                    <Col md={6}>
                        <Radio value={JOB_POST_TIME.Now} checked={postingTime === JOB_POST_TIME.Now}
                               onChange={onPostingTimeChanged}>Yes, post now</Radio>

                        <Radio value={JOB_POST_TIME.Later} checked={postingTime === JOB_POST_TIME.Later}
                               onChange={onPostingTimeChanged}>No, just save the job details for now. (You may come back
                            to view or post the job at any time.)</Radio>

                        <Radio value={JOB_POST_TIME.Never} checked={postingTime === JOB_POST_TIME.Never}
                               onChange={onPostingTimeChanged}>Cancel this job posting. (You will lose all the details you have entered for this job.) </Radio>

                        {postVisibilityDiv}
                    </Col>
                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onPostJob}>Submit</Button>
            </Modal.Footer>
        </div>

    );


};

SubmitJobConfirmation.propTypes = {
    onPostingTimeChanged: T.func.isRequired,
    onPostVisibilityChanged: T.func.isRequired,
    postingTime: T.string.isRequired,
    postVisibility: T.string.isRequired,
    onPostJob: T.func.isRequired,
};

export default CSSModules(SubmitJobConfirmation, styles);