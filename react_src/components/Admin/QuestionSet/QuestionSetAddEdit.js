import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap';
import QSetQuestionEditContainer from './QSetQuestionEditContainer';
import styles from './QuestionSet.css';
import CSSModules from 'react-css-modules';
const classNames = require('classnames');

const QuestionSetAddEdit = ({questionSet, questions, pageTitle, questionSetFunctions, panelTargets, canAddQSetQuestion}) => {

    let { onUpdateQuestionPanel, addQSetQuestion, handleCancel, handleSubmit } = questionSetFunctions;
    let labelColSize = 3;
    let inputColSize = 9;

    let panelTargetOptions = panelTargets.map((panel, i) =>
        <option key={i} value={panel.id}>{panel.name}</option>
    );
    panelTargetOptions.unshift(<option key="select" value="0">select panel...</option>);

    let qSetQuestionList = questionSet.qSetQuestions.map((q, i) =>
        <QSetQuestionEditContainer
            key={i}
            qSetQuestion={q}
            questions={questions}
            panelTargets={panelTargets}
            questionSetFunctions={questionSetFunctions} />
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
                            <FormControl styleName="inputSelectQuestionSet"
                                         componentClass="select"
                                         name="action"
                                         defaultValue={questionSet.questionPanelId}
                                         onChange={onUpdateQuestionPanel}>
                                {panelTargetOptions}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    {/* QUESTION-SET QUESTIONS */}
                    {qSetQuestionList}

                    {/* ADD QUESTION BUTTON */}
                    <Row styleName="addQuestionButtonRow">
                        <Col sm={4}>
                            <Button type="button" className="btn btn-sm btn-default"
                                    disabled={!canAddQSetQuestion}
                                    onClick={addQSetQuestion}>Add Question</Button>
                        </Col>
                    </Row>


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
