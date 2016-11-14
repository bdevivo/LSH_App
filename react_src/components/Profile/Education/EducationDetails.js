import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Education.css';


const EducationDetails = ({educationRecord, enterEducationEditMode}) => {

    return (
        <div styleName="profileDiv">
            <Row>
                <Col md={6} mdOffset={1}>
                    <p><strong>{educationRecord.school}</strong></p>
                   <p>{educationRecord.degree}</p>
                   <p>{educationRecord.fromYear}{'-'}{educationRecord.toYear}</p>
                   <p><span>GPA: </span>{educationRecord.gpa}</p>
                   <p><span>Field(s) of study: </span>{educationRecord.fieldsOfStudy}</p>
                   <p><span>Description: </span>{educationRecord.description}</p>
                </Col>

               <Col md={1}>
                  <a href="#" onClick={() => enterEducationEditMode(educationRecord.id)}>Edit</a>
               </Col>
            </Row>
        </div>
    );

};

EducationDetails.propTypes = {
    educationRecord: PropTypes.object.isRequired,
    enterEducationEditMode: PropTypes.func.isRequired
};

export default CSSModules(EducationDetails, styles);
