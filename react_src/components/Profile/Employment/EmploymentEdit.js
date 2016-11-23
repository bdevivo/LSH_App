import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button, HelpBlock, Modal
} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Employment.css';
import createYearIter from './YearIterator';
import months from './Months';

const classNames = require('classnames');


const EmploymentEdit = ({
    currentEmploymentRecord, handleSubmit, handleCancel, updateProfileField, updateProfileCheckboxField, validationState
}) => {

    const left_col_wd = 2;
    const right_col_wd = 10;

    let startYearOptions = [<option key="placeholder" value="0">Select...</option>];
    let fromYearIter = createYearIter({startOffset: 0, total: 80, order: 'DESC'});
    for (let y of fromYearIter) {
        startYearOptions.push(<option key={y} value={y}>{y}</option>);
    }

    let endYearOptions = [<option key="placeholder" value="0">Select...</option>];
    let endYearIter = createYearIter({startOffset: 8, total: 80, order: 'DESC'});
    for (let y of endYearIter) {
        endYearOptions.push(<option key={y} value={y}>{y}</option>);
    }

    let monthOptions = months.map(m => <option key={m.key} value={m.key}>{m.val}</option>);
    monthOptions.unshift(<option key="placeholder" value="0">Select...</option>);

    function getValidationState(field, value) {
        if (value.length > 0)
            return 'success';
        else if (!validationState[field])
            return 'error';
        else
            return 'success';
    }

    function getValidationStateSelect(field, value) {
        if (value > 0)
            return 'success';
        else
            return 'error';
    }

    function createValidationStyleName(field, value) {
        return classNames({
            'showError': value && value.length == 0 && !validationState[field],
            'hideError': validationState[field]
        });
    }

    return (

        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employment</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row styleName="root">

                    <Col md={11}>

                        <Form horizontal>

                            <FormGroup validationState={getValidationState('company', currentEmploymentRecord.company)}>
                                <Col componentClass={ControlLabel} sm={left_col_wd}>
                                    Company
                                </Col>
                                <Col sm={right_col_wd}>
                                    <FormControl
                                        type="text"
                                        name="company"
                                        defaultValue={currentEmploymentRecord.company}
                                        onChange={updateProfileField}/>
                                    <FormControl.Feedback styleName={createValidationStyleName('company')}/>
                                </Col>
                                <HelpBlock
                                    styleName={createValidationStyleName('company', currentEmploymentRecord.company)}>Please
                                    enter company name</HelpBlock>
                            </FormGroup>

                            <FormGroup validationState={getValidationState('title', currentEmploymentRecord.title)}>
                                <Col componentClass={ControlLabel} sm={left_col_wd}>
                                    Title
                                </Col>
                                <Col sm={right_col_wd}>
                                    <FormControl styleName="formInput"
                                                 type="text"
                                                 name="title"
                                                 defaultValue={currentEmploymentRecord.title}
                                                 onChange={updateProfileField}/>
                                    <FormControl.Feedback styleName={createValidationStyleName('title')}/>
                                </Col>
                                <HelpBlock
                                    styleName={createValidationStyleName('title', currentEmploymentRecord.location)}>Please
                                    enter job role/title</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                validationState={getValidationState('location', currentEmploymentRecord.location)}>
                                <Col componentClass={ControlLabel} sm={left_col_wd}>
                                    Location
                                </Col>
                                <Col sm={right_col_wd}>
                                    <FormControl styleName="formInput"
                                                 type="text"
                                                 name="location"
                                                 defaultValue={currentEmploymentRecord.location}
                                                 onChange={updateProfileField}/>
                                    <FormControl.Feedback styleName={createValidationStyleName('location')}/>
                                </Col>
                                <HelpBlock
                                    styleName={createValidationStyleName('location', currentEmploymentRecord.location)}>Please
                                    enter company location</HelpBlock>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>

                <Row>

                    <Col md={11}>

                        <Col componentClass={ControlLabel} md={2} styleName="TimePeriodSubhead">
                            Time Period
                        </Col>

                        <Col md={2}>

                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="fromMonth"
                                         defaultValue={currentEmploymentRecord.fromMonth}
                                         onChange={updateProfileField}>
                                {monthOptions}
                            </FormControl>
                            {/*<FormControl.Feedback styleName={createValidationStyleName('fromMonth')}/>*/}
                        </Col>

                        <Col md={2}>


                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="fromYear"
                                         defaultValue={currentEmploymentRecord.fromYear}
                                         onChange={updateProfileField}>
                                {startYearOptions}
                            </FormControl>

                            {/*<FormControl.Feedback styleName={createValidationStyleName('fromYear')}/>*/}

                        </Col>

                        <Col md={1} styleName="middleDashCol">
                            {' - '}
                        </Col>

                        <Col md={2}>


                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="toMonth"
                                         defaultValue={currentEmploymentRecord.toMonth}
                                         onChange={updateProfileField}>
                                {monthOptions}
                            </FormControl>


                        </Col>

                        <Col md={2}>

                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="toYear"
                                         defaultValue={currentEmploymentRecord.toYear}
                                         onChange={updateProfileField}>
                                {endYearOptions}
                            </FormControl>


                        </Col>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup validationState="success">
                            <Col md={6} mdOffset={2}>
                                <Checkbox
                                    name="isCurrent"
                                    defaultValue={currentEmploymentRecord.isCurrent}
                                    onChange={updateProfileCheckboxField}>
                                    This is my Current position
                                </Checkbox>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>


                <Row styleName="root">
                    <Col md={11}>
                        <Form horizontal>

                            <FormGroup validationState="success">
                                <Col sm={left_col_wd}>
                                    <ControlLabel>Description</ControlLabel>
                                </Col>
                                <Col sm={right_col_wd}>
                                    <FormControl componentClass="textarea" name="description"
                                                 defaultValue={currentEmploymentRecord.description}
                                                 onChange={updateProfileField}/>
                                </Col>
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

EmploymentEdit.propTypes = {
    currentEmploymentRecord: T.object.isRequired,
    showModal: T.bool.isRequired,
    closeModal: T.func.isRequired,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    updateProfileField: T.func.isRequired,
    updateProfileCheckboxField: T.func.isRequired,
    validationState: T.object.isRequired
};

export default CSSModules(EmploymentEdit, styles);
