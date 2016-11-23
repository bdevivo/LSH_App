import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, Modal, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Skills.css';

let Select = require('react-select');


const SkillsEdit = ({skills, handleSubmit, handleCancel, updateProfileSkills}) => {

    let options = [
        { value: 'biostat', label: 'Biostatistics' },
        { value: 'regops', label: 'Reg. Ops. and Publishing' },
        { value: 'regaffairs', label: 'Reg. Affairs' },
        { value: 'regintel', label: 'Reg. Intelligence' },
        { value: 'medWriting', label: 'Medical Writing' },
        { value: 'tmf', label: 'TMF Modeling' },
        { value: 'cra', label: 'CRA' },
        { value: 'datamgmt', label: 'Data Management' },
        { value: 'ectd', label: 'eCTDXpress' },
        { value: 'core_dossier', label: 'CoreDossier' },
        { value: 'insightpub', label: 'Insight Publisher' },
        { value: 'documentum', label: 'Documentum' },
        { value: 'isi', label: 'ISIToolbox' },
    ];

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>

        <Row styleName="root">

            <Col md={10} mdOffset={1}>

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

                </Form>
            </Col>
        </Row>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col md={3} mdOffset={2}>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Col>
                    <Col md={3}>
                        <Button onClick={handleSubmit}>Save</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </div>
    );



};

SkillsEdit.propTypes = {
    skills: T.array,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    updateProfileSkills:  T.func.isRequired
};

export default CSSModules(SkillsEdit, styles);