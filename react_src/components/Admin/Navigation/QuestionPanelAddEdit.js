import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';

const classNames = require('classnames');

/**
 * The Modal form for adding or editing a Question Panel.
 * @param qPanel
 * @param pageTitle
 * @param questionPanelFunctions
 * @returns {XML}
 * @constructor
 */
const QuestionPanelAddEdit = ({qPanel, pageTitle, questionPanelFunctions, panelTargets}) => {

    let {onTextFieldChanged, onUpdateAction} = questionPanelFunctions;
    let labelColSize = 3;
    let inputColSize = 9;

    let panelTargetOptions = panelTargets.map((panel, i) =>
       <option key={i} value={panel.id}>{panel.name}</option>
    );

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{pageTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form horizontal styleName="editForm">

                    {/* PANEL NAME*/}
                    <FormGroup controlId="formControlsQuestionPanelName">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={labelColSize}>Panel Name:</Col>
                        <Col sm={inputColSize} styleName="inlineTextCol">
                            <FormControl name="name" type="text" placeholder="add text" value={qPanel.name}
                                         onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>
                    </FormGroup>

                    {/* PANEL HEADER TEXT*/}
                    <FormGroup controlId="formControlsQuestionPanelHeader">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={labelColSize}>Panel Header:</Col>
                        <Col sm={inputColSize} styleName="inlineTextCol">
                            <FormControl name="header" type="text" placeholder="add text" value={qPanel.header}
                                         onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>
                    </FormGroup>

                    {/* PANEL SUBHEADER TEXT*/}
                    <FormGroup controlId="formControlsQuestionPanelSubheader">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={labelColSize}>Panel
                            Sub-Header:</Col>
                        <Col sm={inputColSize} styleName="inlineTextCol">
                            <FormControl name="subHeader" type="text" placeholder="add text" value={qPanel.subHeader}
                                         onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>
                    </FormGroup>

                    <Row>
                        <hr/>
                    </Row>

                    {/* DEFAULT ACTION */}
                    <FormGroup controlId="formControlsSelectDefaultAction">
                        <h4>Default Action</h4>
                        <Col sm={5} smOffset={2}>
                            <ControlLabel>Action</ControlLabel>
                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="defaultAction"
                                         defaultValue={qPanel.defaultAction.action}
                                         onChange={onUpdateAction}>
                                <option key="placeholder" value="0">Select...</option>
                                <option key="goto" value="GOTO">GO TO</option>
                                <option key="submit" value="SUBMIT">SUBMIT</option>
                            </FormControl>
                        </Col>
                        <Col sm={5}>
                            <ControlLabel>Target</ControlLabel>
                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="defaultActionTarget"
                                         defaultValue={qPanel.defaultAction.target}
                                         onChange={onUpdateAction}>
                               {panelTargetOptions}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <Row>
                        <hr/>
                    </Row>


                    {/* "NEXT" BUTTON TEXT*/}
                    <FormGroup controlId="formControlsQuestionPanelNextButton">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={labelColSize}>"Next" Button
                            Text:</Col>
                        <Col sm={inputColSize} styleName="inlineTextCol">
                            <FormControl name="nextButtonText" type="text" placeholder="add text"
                                         value={qPanel.nextButtonText}
                                         onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>
                    </FormGroup>

                    {/* "BACK" BUTTON TEXT*/}
                    <FormGroup controlId="formControlsQuestionPanelBackButton">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={labelColSize}>"Back" Button
                            Text:</Col>
                        <Col sm={inputColSize} styleName="inlineTextCol">
                            <FormControl name="backButtonText" type="text" placeholder="add text"
                                         value={qPanel.backButtonText}
                                         onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>
                    </FormGroup>


                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col md={3} mdOffset={2}>
                        <Button onClick={questionPanelFunctions.handleCancel}>Cancel</Button>
                    </Col>
                    <Col md={3}>
                        <Button onClick={questionPanelFunctions.handleSubmit}>Save</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </div>
    );


};

QuestionPanelAddEdit.propTypes = {
    qPanel: T.object.isRequired,
    pageTitle: T.string.isRequired,
    questionPanelFunctions: T.object.isRequired,
      panelTargets: T.array.isRequired
};

export default CSSModules(QuestionPanelAddEdit, styles);
