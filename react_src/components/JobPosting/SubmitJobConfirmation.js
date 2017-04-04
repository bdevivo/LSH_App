import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import * as enums from '../../utils/constants/enums';


const SubmitJobConfirmation = ({onPostingTimeChanged, onPostVisibilityChanged, postingTime, postVisibility, onPostJob}) => {

    let {JOB_POST_TIME, JOB_STATUS} = enums;

    const postVisibilityDiv = (postingTime === 'now')
        ? <div styleName="visibilityDiv">
            <h4>Who can see this job posting?</h4>

            <Radio value={JOB_STATUS.PostedPrivate} checked={postVisibility === JOB_STATUS.PostedPrivate}
                   onChange={onPostVisibilityChanged}>Only people I invite</Radio>

            <Radio value={JOB_STATUS.PostedUsersOnly} checked={postVisibility === JOB_STATUS.PostedUsersOnly}
                   onChange={onPostVisibilityChanged}>Anyone with a LifeSciHub account</Radio>

            <Radio value={JOB_STATUS.PostedPublic} checked={postVisibility === JOB_STATUS.PostedPublic}
                   onChange={onPostVisibilityChanged}>Anyone</Radio>

        </div>
        : null;

    let submitEnabled = false;
    switch (postingTime) {
        case JOB_POST_TIME.Now:
            submitEnabled = !!postVisibility;
            break;

        case JOB_POST_TIME.Later: case JOB_POST_TIME.Deferred:
            submitEnabled = true;
            break;

        default:
            submitEnabled = false;
    }

    return (

        <div>
            <Modal.Header closeButton>
                <Modal.Title>Post Job</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Would you like to post your job now?</h4>
                <FormGroup controlId="formControlsPostNowOrLater">


                    <Radio value={JOB_POST_TIME.Now} checked={postingTime === JOB_POST_TIME.Now}
                           onChange={onPostingTimeChanged}>Yes, post now</Radio>

                    <Radio value={JOB_POST_TIME.Later} checked={postingTime === JOB_POST_TIME.Later}
                           onChange={onPostingTimeChanged}>No, just save the job details for now. <span styleName="promptDetails">You may come back
                        to view or post the job at any time.</span></Radio>

                    <Radio value={JOB_POST_TIME.Deferred} checked={postingTime === JOB_POST_TIME.Deferred}
                           onChange={onPostingTimeChanged}>Cancel and return to editing job details.</Radio>

                    {postVisibilityDiv}

                </FormGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onPostJob} disabled={!submitEnabled}>Submit</Button>
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
