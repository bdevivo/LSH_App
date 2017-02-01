import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';

const classNames = require('classnames');

/**
 * The modal form for adding or editing a Question Panel.
 * @param qPanel
 * @param pageTitle
 * @param questionPanelFunctions
 * @returns {XML}
 * @constructor
 */
const QuestionPanelAddEdit = ({qPanel, pageTitle, questionPanelFunctions, panelTargets}) => {

    let {onTextFieldChanged, onUpdateDefaultAction} = questionPanelFunctions;
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
                        <Col sm={3} smOffset={1}>
                            <ControlLabel>Action</ControlLabel>
                            <FormControl styleName="formInputSelect"
                                         componentClass="select"
                                         placeholder="select"
                                         name="action"
                                         defaultValue={qPanel.defaultAction.action}
                                         onChange={onUpdateDefaultAction}>
                                <option key="placeholder" value="0">Select...</option>
                                <option key="goto" value="GOTO">GOTO</option>
                                <option key="submit" value="SUBMIT">SUBMIT</option>
                            </FormControl>
                        </Col>
                        <Col sm={8}>
                            <ControlLabel>Target</ControlLabel>
                            <FormControl styleName="formInputSelectWide"
                                         componentClass="select"
                                         placeholder="select"
                                         name="target"
                                         defaultValue={qPanel.defaultAction.target}
                                         onChange={onUpdateDefaultAction}>
                               {panelTargetOptions}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <Row>
                        <hr/>
                    </Row>

                   {/* "NEXT" and "BACK" BUTTON TEXT*/}
                    <FormGroup controlId="formControlsQuestionPanelNextButton">
                       <h4>Button Text</h4>
                       {/* "NEXT" BUTTON */}
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1} smOffset={1}>"Next":</Col>
                        <Col sm={3} styleName="inlineTextCol">
                            <FormControl name="nextButtonText" type="text" placeholder="add text"
                                         value={qPanel.nextButtonText}
                                         onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>

                       {/* "BACK" BUTTON */}
                       <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1} smOffset={1}>"Back":</Col>
                       <Col sm={3} styleName="inlineTextCol">
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
