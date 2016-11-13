import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Education.css';


const EducationDetails = ({educationRecord, enterEducationEditMode}) => {

    return (
        <div>
            <Row styleName="userProfile">
                <Col md={12}>
                    <strong>{educationRecord.school}</strong>
                </Col>
            </Row>

            <Row styleName="userProfile">
                <Col md={12}>
                    <p>{educationRecord.degree}</p>
                </Col>
            </Row>

            <Row styleName="userProfile">
                <Col md={12}>
                    <p>{educationRecord.fromYear}{'-'}{educationRecord.toYear}</p>
                </Col>
            </Row>

            <Row styleName="userProfile">
                <Col md={12}>
                    <p>{educationRecord.fieldsOfStudy}</p>
                </Col>
            </Row>

            <Row styleName="userProfile">
                <Col md={12}>
                    <p>{educationRecord.gpa}</p>
                </Col>
            </Row>

            <Row styleName="userProfile">
                <Col md={12}>
                    <p>{educationRecord.description}</p>
                </Col>
            </Row>

            <Row>
                <a href="#" onClick={() => enterEducationEditMode(educationRecord.id)}>Edit</a>
            </Row>
        </div>
    );

};

EducationDetails.propTypes = {
    educationRecord: PropTypes.object.isRequired,
    enterEducationEditMode: PropTypes.func.isRequired
};

export default CSSModules(EducationDetails, styles);
