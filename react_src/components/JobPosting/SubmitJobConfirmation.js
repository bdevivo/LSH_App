import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './JobPosting.css';
import CSSModules from 'react-css-modules';
import * as enums from '../../utils/enums';


const SubmitJobConfirmation = ({onPostingTimeChanged, onPostVisibilityChanged, postingTime, postVisibility, onPostJob}) => {

    const postVisibilityDiv = (postingTime === 'now')
        ? <div>
            <h3>Who can see this job posting?</h3>
            <Col md={6}>
                <Radio value="private" checked={postVisibility === "private"}
                       onChange={onPostVisibilityChanged}>Only people I invite</Radio>

                <Radio value="users_only" checked={postVisibility === "users_only"}
                       onChange={onPostVisibilityChanged}>Anyone with a LifeSciHub account</Radio>

                <Radio value="public" checked={postVisibility === "public"}
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
                        <Radio value="postJobNow" checked={postingTime === "now"}
                               onChange={onPostingTimeChanged}>Yes, post now</Radio>

                        <Radio value="postJobLater" checked={postingTime === "later"}
                               onChange={onPostingTimeChanged}>No, just save the job details for now. (You may come back
                            to view or post the job at any time.)</Radio>

                        <Radio value="doNotPost" checked={postingTime === "never"}
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