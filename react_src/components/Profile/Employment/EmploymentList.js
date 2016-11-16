import React, {PropTypes} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import EmploymentDetails from './EmploymentDetails';
import CSSModules from 'react-css-modules';
import styles from './Employment.css';


const EmploymentList = ({employmentRecords, enterEmploymentEditMode, removeEmpRecord}) => {

    let employmentDetailsList = (
        employmentRecords.length > 0
            ? employmentRecords.map(emp =>
                    <Row key={emp.id}>
                        <EmploymentDetails
                            employmentRecord={emp}
                            enterEmploymentEditMode={enterEmploymentEditMode}
                            removeEmpRecord={removeEmpRecord}/>
                    </Row>)
            : <p>No items to display</p>
    );

    return (
        <div>
           {employmentDetailsList}
           <Row styleName="addButtonRow">
              <Col md={6}>
                  <Button type="button" className="btn btn-lg btn-default" aria-label="Add" onClick={() => enterEmploymentEditMode(0)}>
                      <span className="glyphicon glyphicon-plus-sign"></span>
                  </Button>
              </Col>
           </Row>

        </div>
    );

};

EmploymentList.propTypes = {
    employmentRecords: PropTypes.array.isRequired,
    enterEmploymentEditMode: PropTypes.func.isRequired,
    removeEmpRecord: PropTypes.func.isRequired,
};

export default CSSModules(EmploymentList, styles);
