import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Skills.css';
import 'react-select/dist/react-select.css';

let Select = require('react-select');


const SkillsEdit = ({profile, handleSubmit, handleCancel, updateProfileSkills}) => {

    let options = [
        { value: 'biostats', label: 'BiosState' },
        { value: 'csr', label: 'CSR', clearableValue: false }
    ];

    return (
        <Row styleName="root">

            <Col md={12}>

                <Form horizontal>


                    <FormGroup>
                        <Select
                            multi
                            name="form-field-name"

                            options={options}
                            onChange={updateProfileSkills}
                        />




                    </FormGroup>


                    <FormGroup >
                        <Col smOffset={2} sm={3} styleName="submitButton">
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Col>
                        <Col  sm={4} styleName="submitButton">
                            <Button onClick={handleSubmit}>Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );



};

SkillsEdit.propTypes = {
    profile: T.object,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    updateProfileSkills:  T.func.isRequired
};

export default CSSModules(SkillsEdit, styles);