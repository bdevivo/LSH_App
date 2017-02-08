import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap';
import QSetQuestionEditContainer from './QSetQuestionEditContainer';
import styles from './QuestionSet.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const QuestionSetAddEdit = ({questionSet, questions, pageTitle, questionSetFunctions, panelTargets, canAddQSetQuestion}) => {

    let { onUpdateQuestionPanel, handleCancel, handleSubmit } = questionSetFunctions;
    let labelColSize = 2;
    let inputColSize = 8;

    let panelTargetOptions = panelTargets.map((panel, i) =>
        <option key={i} value={panel.id}>{panel.name}</option>
    );
    panelTargetOptions.unshift(<option key="select" value="0">select panel...</option>);

    let qSetQuestionList = questionSet.questions.map((q, i) =>
        <QSetQuestionEditContainer
            key={i}
            qSetQuestion={q}
            questions={questions}
            panelTargets={panelTargets} />
    );


    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{pageTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form horizontal styleName="editForm">

                    {/* QUESTION PANEL (to which this Question Set will be mapped) */}
                    <FormGroup controlId="formControlsQuestionSetName">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={labelColSize}>Question Panel:</Col>
                        <Col sm={inputColSize} styleName="inlineTextCol">
                            <FormControl styleName="formInputActionSelectWide"
                                         componentClass="select"
                                         name="action"
                                         defaultValue={questionSet.questionPanelId}
                                         onChange={onUpdateQuestionPanel}>
                                {panelTargetOptions}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    {/* QUESTION-SET QUESTIONS */}
                    <FormGroup styleName="conditionalQuestionFormGroup">
                        <Col sm={3} styleName="subHeaderLeftCol">
                            <h4>Questions</h4>
                        </Col>
                        <Col sm={6}>
                            <Button type="button" className="btn btn-sm btn-default"
                                    disabled={!canAddQSetQuestion}
                                    onClick={canAddQSetQuestion}>Add New</Button>
                        </Col>
                    </FormGroup>

                    {qSetQuestionList}


                </Form>

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

QuestionSetAddEdit.propTypes = {
    questionSet: T.object.isRequired,
    questions: T.array.isRequired,
    pageTitle: T.string.isRequired,
    questionSetFunctions: T.object.isRequired,
    panelTargets: T.array.isRequired,
    canAddQSetQuestion: T.bool.isRequired
};

export default CSSModules(QuestionSetAddEdit, styles);
