import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button, HelpBlock, Modal} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Employment.css';
import createYearIter from './YearIterator';
import months from './Months';

const classNames = require('classnames');


const EmploymentEdit = ({
    currentEmploymentRecord, handleSubmit, handleCancel, updateProfileEmploymentField, validationState}) => {

    const left_col_wd = 2;
    const right_col_wd = 8;

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

    let monthOptions = months.map(m => <option key={m} value={m}>{m}</option>);
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

                    <Col md={12}>

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
                                        onChange={updateProfileEmploymentField}/>
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
                                                 name="location"
                                                 defaultValue={currentEmploymentRecord.title}
                                                 onChange={updateProfileEmploymentField}/>
                                    <FormControl.Feedback styleName={createValidationStyleName('title')}/>
                                </Col>
                                <HelpBlock
                                    styleName={createValidationStyleName('title', currentEmploymentRecord.location)}>Please
                                    enter job role/title</HelpBlock>
                            </FormGroup>

                            <FormGroup validationState={getValidationState('location', currentEmploymentRecord.location)}>
                                <Col componentClass={ControlLabel} sm={left_col_wd}>
                                    Location
                                </Col>
                                <Col sm={right_col_wd}>
                                    <FormControl styleName="formInput"
                                                 type="text"
                                                 name="location"
                                                 defaultValue={currentEmploymentRecord.location}
                                                 onChange={updateProfileEmploymentField}/>
                                    <FormControl.Feedback styleName={createValidationStyleName('location')}/>
                                </Col>
                                <HelpBlock
                                    styleName={createValidationStyleName('location', currentEmploymentRecord.location)}>Please
                                    enter company location</HelpBlock>
                            </FormGroup>

                        </Form>

                        <Form inline styleName="formInline">
                            <ControlLabel>Time Period</ControlLabel>

                            <FormGroup styleName="formGroupInline"
                                       validationState={getValidationStateSelect('fromMonth', currentEmploymentRecord.fromMonth)}>

                                <FormControl styleName="formInputSelect"
                                             componentClass="select"
                                             placeholder="select"
                                             name="fromMonth"
                                             defaultValue={currentEmploymentRecord.fromMonth}
                                             onChange={updateProfileEmploymentField}>
                                    {monthOptions}
                                </FormControl>
                                <FormControl.Feedback styleName={createValidationStyleName('fromMonth')}/>

                            </FormGroup>
                            {'  '}
                            <FormGroup styleName="formGroupInline"
                                       validationState={getValidationStateSelect('fromYear', currentEmploymentRecord.fromYear)}>

                                <FormControl styleName="formInputSelect"
                                             componentClass="select"
                                             placeholder="select"
                                             name="fromYear"
                                             defaultValue={currentEmploymentRecord.fromYear}
                                             onChange={updateProfileEmploymentField}>
                                    {startYearOptions}
                                </FormControl>

                                <FormControl.Feedback styleName={createValidationStyleName('fromYear')}/>

                            </FormGroup>

                            {' - '}

                            <FormGroup styleName="formGroupInline"
                                       validationState={getValidationStateSelect('toMonth', currentEmploymentRecord.toMonth)}>

                                <FormControl styleName="formInputSelect"
                                             componentClass="select"
                                             placeholder="select"
                                             name="toMonth"
                                             defaultValue={currentEmploymentRecord.toMonth}
                                             onChange={updateProfileEmploymentField}>
                                    {monthOptions}
                                </FormControl>
                                <FormControl.Feedback styleName={createValidationStyleName('toMonth')}/>

                            </FormGroup>
                            {'  '}
                            <FormGroup styleName="formGroupInline"
                                       validationState="success">
                                <FormControl styleName="formInputSelect"
                                             componentClass="select"
                                             placeholder="select"
                                             name="toYear"
                                             defaultValue={currentEmploymentRecord.toYear}
                                             onChange={updateProfileEmploymentField}>
                                    {endYearOptions}
                                </FormControl>
                            </FormGroup>
                        </Form>

                        <Form horizontal>

                            <FormGroup validationState="success">
                                <Col sm={right_col_wd}>
                                    <Checkbox
                                         name="isCurrent"
                                         defaultValue={currentEmploymentRecord.isCurrent}
                                         onChange={updateProfileEmploymentField}>
                                        Current position
                                        </Checkbox>
                                </Col>
                            </FormGroup>



                            <FormGroup validationState="success">
                                <Col sm={left_col_wd}>
                                    <ControlLabel>Description</ControlLabel>
                                </Col>
                                <Col sm={right_col_wd}>
                                    <FormControl componentClass="textarea" name="description"
                                                 defaultValue={currentEmploymentRecord.description}
                                                 onChange={updateProfileEmploymentField}/>
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
    updateProfileEmploymentField: T.func.isRequired,
    validationState: T.object.isRequired
};

export default CSSModules(EmploymentEdit, styles);
