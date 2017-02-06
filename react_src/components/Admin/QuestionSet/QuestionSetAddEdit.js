import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap';
import ConditionalPanelActionEditContainer from './ConditionalQuestionEditContainer';
import styles from './QuestionSet.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const QuestionPanelAddEdit = ({qPanel, questions, pageTitle, questionPanelFunctions, panelTargets, canAddConditionalQuestion}) => {

    let {onTextFieldChanged, onUpdateDefaultAction} = questionPanelFunctions;
    let labelColSize = 2;
    let inputColSize = 8;

    let panelTargetOptions = panelTargets.map((panel, i) =>
        <option key={i} value={panel.id}>{panel.name}</option>
    );
    panelTargetOptions.unshift(<option key="select" value="0">select panel...</option>);

    const createDefaultTargetDivStyleName = () => {
        return classNames({
            'showTargetDiv': qPanel.defaultAction.action === "goto",
            'hideTargetDiv': qPanel.defaultAction.action === "submit"
        });
    };

    let conditionalActionList = qPanel.conditionalActions.map((action, i) =>
        <ConditionalPanelActionEditContainer
            key={i}
            conditionalAction={action}
            questions={questions}
            questionPanelFunctions={questionPanelFunctions}
            panelTargets={panelTargets}/>
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


                    {/* CONDITIONAL ACTION */}
                    <FormGroup styleName="conditionalActionFormGroup">
                        <Col sm={3} styleName="subHeaderLeftCol">
                            <h4>Conditional Actions</h4>
                        </Col>
                        <Col sm={6}>
                            <Button type="button" className="btn btn-sm btn-default"
                                    disabled={!canAddConditionalQuestion}
                                    onClick={questionPanelFunctions.addConditionalAction}>Add New</Button>
                        </Col>
                    </FormGroup>

                    {conditionalActionList}

                    <hr/>

                    {/* DEFAULT ACTION */}
                    <FormGroup controlId="formControlsSelectDefaultAction">
                        <h4>Default Action</h4>


                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1} smOffset={1}>Action:</Col>
                        <Col sm={2}>
                            <FormControl styleName="formInputActionSelectSmall"
                                         componentClass="select"
                                         placeholder="select"
                                         name="action"
                                         defaultValue={qPanel.defaultAction.action}
                                         onChange={onUpdateDefaultAction}>
                                <option key="goto" value="goto">GO TO</option>
                                <option key="submit" value="submit">SUBMIT</option>
                            </FormControl>
                        </Col>

                        <div styleName={createDefaultTargetDivStyleName()}>
                            <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Target:</Col>
                            <Col sm={6}>
                                <FormControl styleName="formInputActionSelectWide"
                                             componentClass="select"
                                             placeholder="select"
                                             name="target"
                                             defaultValue={qPanel.defaultAction.target}
                                             onChange={onUpdateDefaultAction}>
                                    {panelTargetOptions}
                                </FormControl>
                            </Col>
                        </div>

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
    questions: T.array.isRequired,
    pageTitle: T.string.isRequired,
    questionPanelFunctions: T.object.isRequired,
    panelTargets: T.array.isRequired,
    canAddConditionalQuestion: T.bool.isRequired
};

export default CSSModules(QuestionPanelAddEdit, styles);
