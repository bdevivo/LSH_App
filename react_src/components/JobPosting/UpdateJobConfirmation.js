import React, {PropTypes as T} from 'react';
import {Button, Modal} from 'react-bootstrap';
import styles from './JobPosting.css';
import * as enums from '../../utils/constants/enums';
import CSSModules from 'react-css-modules';

const UpdateJobConfirmation = ({onPostJob, onCancelUpdate}) => {

    let {JOB_POST_TIME} = enums;

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Update your job posting?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Button onClick={() => onPostJob(JOB_POST_TIME.Now)}>Yes, update now</Button>
                <Button onClick={onCancelUpdate}>No, return to editing</Button>
            </Modal.Body>


        </div>

    );


};

UpdateJobConfirmation.propTypes = {
    onPostJob: T.func.isRequired,
    onCancelUpdate: T.func.isRequired,
};

export default CSSModules(UpdateJobConfirmation, styles);
