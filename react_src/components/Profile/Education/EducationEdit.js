import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Education.css';
import createYearIter from './YearIterator';

const classNames = require('classnames');


const EducationEdit = ({educationRecord, handleSubmit, handleCancel, updateProfileEducationField, validationState}) => {

    const left_col_wd = 2;
    const right_col_wd = 8;
    const right_col_short_wd = 3;


    let startYearOptions = [<option key="placeholder" value="0">Select...</option>];
    let fromYearIter = createYearIter({startOffset: 0, total: 80, order: 'DESC'});
    for (let y of fromYearIter)
    {
        startYearOptions.push(<option key={y} value={y}>{y}</option>);
    }

    let endYearOptions = [<option key="placeholder" value="0">Select...</option>];
    let endYearIter = createYearIter({startOffset: 8, total: 80, order: 'DESC'});
    for (let y of endYearIter)
    {
        endYearOptions.push(<option key={y} value={y}>{y}</option>);
    }

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
        <Row styleName="root">

            <Col md={12}>

                <Form horizontal>

                    <FormGroup validationState={getValidationState('school', educationRecord.school)}>
                        <Col componentClass={ControlLabel}  sm={left_col_wd}>
                            School
                        </Col>
                        <Col sm={right_col_wd}>
                            <FormControl styleName="formInput"
                                         type="text"
                                         name="school"
                                         defaultValue={educationRecord.school}
                                         onChange={updateProfileEducationField} />
                            <FormControl.Feedback styleName={createValidationStyleName('school')} />
                        </Col>
                        <HelpBlock styleName={createValidationStyleName('school', educationRecord.school)}>Please enter school name</HelpBlock>
                    </FormGroup>

                    <FormGroup validationState={getValidationState('degree', educationRecord.degree)}>
                        <Col componentClass={ControlLabel} sm={left_col_wd}>
                            Degree
                        </Col>
                        <Col sm={right_col_wd}>
                            <FormControl  styleName="formInput"
                                          type="text"
                                          name="degree"
                                          defaultValue={educationRecord.degree}
                                          onChange={updateProfileEducationField} />
                            <FormControl.Feedback styleName={createValidationStyleName('degree')} />
                        </Col>
                        <HelpBlock styleName={createValidationStyleName('degree', educationRecord.degree)}>Please enter degree obtained or expected</HelpBlock>
                    </FormGroup>

                </Form>

                <Form inline styleName="formInline">

                    <FormGroup styleName="formGroupInline"
                               validationState={getValidationStateSelect('fromYear', educationRecord.fromYear)} >
                        <ControlLabel>Start Year</ControlLabel>
                        {' '}
                        <FormControl styleName="formInputSelect"
                            componentClass="select"
                            placeholder="select"
                            name="fromYear"
                            defaultValue={educationRecord.fromYear}
                            onChange={updateProfileEducationField}>
                            {startYearOptions}
                        </FormControl>

                        <FormControl.Feedback styleName={createValidationStyleName('fromYear')} />

                    </FormGroup>



                    <FormGroup styleName="formGroupInline"
                               validationState="success">
                        <ControlLabel>End Year</ControlLabel>
                        {'  '}
                        <FormControl styleName="formInputSelect"
                                     componentClass="select"
                                     placeholder="select"
                                     name="toYear"
                                     defaultValue={educationRecord.toYear}
                                     onChange={updateProfileEducationField}>
                            {endYearOptions}
                        </FormControl>
                    </FormGroup>

                    <FormGroup styleName="formGroupInline">
                        <HelpBlock styleName={createValidationStyleName('fromYear', educationRecord.fromYear)}>Please enter year studies began</HelpBlock>
                    </FormGroup>


                </Form>

                <Form horizontal>

                    <FormGroup>
                        <Col  sm={left_col_wd}>
                            <ControlLabel>Grade/GPA</ControlLabel>
                        </Col>
                        <Col sm={right_col_wd}>
                            <FormControl type="text" name="gpa" defaultValue={educationRecord.gpa} onChange={updateProfileEducationField} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col  sm={left_col_wd}>
                            <ControlLabel>Fields of Study</ControlLabel>
                        </Col>
                        <Col sm={right_col_wd}>
                            <FormControl componentClass="textarea" name="fieldsOfStudy" defaultValue={educationRecord.fieldsOfStudy} onChange={updateProfileEducationField} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col  sm={left_col_wd}>
                            <ControlLabel>Description</ControlLabel>
                        </Col>
                        <Col sm={right_col_wd}>
                            <FormControl componentClass="textarea" name="description" defaultValue={educationRecord.description} onChange={updateProfileEducationField} />
                        </Col>
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

EducationEdit.propTypes = {
    educationRecord: T.object,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    updateProfileEducationField:  T.func.isRequired,
    validationState: T.object
};

export default CSSModules(EducationEdit, styles);
