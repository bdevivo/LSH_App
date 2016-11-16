import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Skills.css';

let Select = require('react-select');


const SkillsEdit = ({skills, handleSubmit, handleCancel, updateProfileSkills}) => {

    let options = [
        { value: 'biostats', label: 'BiosStats' },
        { value: 'csr', label: 'CSR' }
    ];

    return (
        <Row styleName="root">

            <Col md={10}>

                <Form horizontal>
                    <FormGroup>
                        <Select
                            multi
                            clearable={false}
                            name="form-field-name"
                            value={skills}
                            options={options}
                            onChange={updateProfileSkills}/>
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
    skills: T.array,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    updateProfileSkills:  T.func.isRequired
};

export default CSSModules(SkillsEdit, styles);