import React, {PropTypes} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Education.css';


const EducationDetails = ({educationRecord, enterEducationEditMode, removeEduRecord}) => {

    return (
        <div styleName="profileDiv">
            <Row>
                <Col md={6} mdOffset={1}>
                    <p><strong>{educationRecord.school}</strong></p>
                   <p>{educationRecord.degree}</p>
                   <p>{educationRecord.fromYear}{'-'}{educationRecord.toYear}</p>
                   <p><span styleName="inlineHeader">GPA: </span>{educationRecord.gpa}</p>
                   <p><span styleName="inlineHeader">Field(s) of Study: </span>{educationRecord.fieldsOfStudy}</p>
                   <p><span styleName="inlineHeader">Description: </span>{educationRecord.description}</p>
                </Col>

               <Col md={1} mdOffset={2}>
                  {/*<a href="#" onClick={() => enterEducationEditMode(educationRecord.id)}>Edit</a>*/}

                   <Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={() => enterEducationEditMode(educationRecord.id)}>
                       <span className="glyphicon glyphicon-pencil"></span>
                   </Button>

               </Col>
                <Col md={1}>
                    {/*<a href="#" onClick={() => removeEduRecord(educationRecord.id)}>Remove</a>*/}

                    <Button type="button" className="btn btn-sm btn-default" aria-label="Remove" onClick={() => removeEduRecord(educationRecord.id)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </Col>
            </Row>

        </div>
    );

};

EducationDetails.propTypes = {
    educationRecord: PropTypes.object.isRequired,
    enterEducationEditMode: PropTypes.func.isRequired,
    removeEduRecord: PropTypes.func.isRequired
};

export default CSSModules(EducationDetails, styles);
