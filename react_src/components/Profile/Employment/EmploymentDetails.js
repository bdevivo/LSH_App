import React, {PropTypes} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import months from './Months';
import CSSModules from 'react-css-modules';
import styles from './Employment.css';


const EmploymentDetails = ({employmentRecord, enterEmploymentEditMode, removeEmpRecord}) => {

    let empFromMonth;
    if (employmentRecord.fromMonth > 0) {
        empFromMonth = months.find(x => x.key == employmentRecord.fromMonth).val;
    }

    let empFromSpan = (
        empFromMonth
                ? <span>{empFromMonth}{', '}{employmentRecord.fromYear}</span>
                : <span>{employmentRecord.fromYear}</span>
    );

    let empToMonth;
    if (employmentRecord.toMonth > 0) {
        empToMonth = months.find(x => x.key == employmentRecord.toMonth).val;
    }

    let empToSpan = (   // if the position is current, the time range will be "<start date> - Present"
        employmentRecord.isCurrent
            ? <span>Present</span>
            : empToMonth
                ? <span>{empToMonth}{', '}{employmentRecord.toYear}</span>
                : <span>{employmentRecord.toYear}</span>
    );

    return (
        <div styleName="profileDiv">
            <Row>
                <Col md={6} mdOffset={1}>
                    <p><strong>{employmentRecord.company}</strong></p>
                   <p>{employmentRecord.location}</p>
                    <p>{employmentRecord.title}</p>
                   <p>{empFromSpan}{' - '}{empToSpan}</p>
                   <p><span styleName="inlineHeader">Description: </span>{employmentRecord.description}</p>
                </Col>

               <Col md={1} mdOffset={2}>
                   <Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={() => enterEmploymentEditMode(employmentRecord.id)}>
                       <span className="glyphicon glyphicon-pencil"></span>
                   </Button>

               </Col>
                <Col md={1}>
                    <Button type="button" className="btn btn-sm btn-default" aria-label="Remove" onClick={() => removeEmpRecord(employmentRecord.id)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </Col>
            </Row>

        </div>
    );

};

EmploymentDetails.propTypes = {
    employmentRecord: PropTypes.object.isRequired,
    enterEmploymentEditMode: PropTypes.func.isRequired,
    removeEmpRecord: PropTypes.func.isRequired
};

export default CSSModules(EmploymentDetails, styles);
