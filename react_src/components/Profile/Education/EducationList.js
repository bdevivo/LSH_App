import React, {PropTypes} from 'react';
import {Row, Col,  Button} from 'react-bootstrap';
import EducationDetails from './EducationDetails';
import CSSModules from 'react-css-modules';
import styles from './Education.css';


const EducationList = ({educationRecords, enterEducationEditMode}) => {

    let educationDetailsList = (
        educationRecords.length > 0
            ? educationRecords.map(edu => <Row key={edu.id}><EducationDetails educationRecord={edu} enterEducationEditMode={enterEducationEditMode} /></Row>)
            : <p>No items to display</p>
    );

    return (
        <div>
           {educationDetailsList}
           <Row styleName="addButtonRow">
              <Col md={6} mdOffset={1}>
                  <p><a href="#" onClick={() => enterEducationEditMode(0)}>Add</a></p>
              </Col>
           </Row>
        </div>
    );

};

EducationList.propTypes = {
    educationRecords: PropTypes.array.isRequired,
    enterEducationEditMode: PropTypes.func.isRequired
};

export default CSSModules(EducationList, styles);
