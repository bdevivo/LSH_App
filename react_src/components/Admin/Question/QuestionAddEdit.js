import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import SelectOptionContainer from "./AnswerTypeSelect/SelectOptionsContainer";
import BooleanForm from './AnswerTypeBoolean/BooleanForm';
import styles from './Question.css';
import CSSModules from 'react-css-modules';

const classNames = require('classnames');

const QuestionAddEdit = ({
    question, pageTitle, questionFunctions, selectionOptionFunctions, onEditBooleanOptionSave,
    onToggleConditionalQuestionText, isQuestionTextConditional}) => {

    const createResourcesTextStyleName = () => {
        return classNames({
            'showResourcesTextField': isQuestionTextConditional,
            'hideResourcesTextField': !isQuestionTextConditional
        });
    };

    let answerTypeDetails = [];
    let answerType = question.answerType;

    switch (answerType) {
        case "singleSelect":
        case "multiSelect": {

            answerTypeDetails = (<SelectOptionContainer
                optionItems={question.selectOptionItems}
                selectionOptionFunctions={selectionOptionFunctions}
            />);
            break;
        }

        case "boolean": {
            answerTypeDetails = (<BooleanForm
                    question={question}
                    onSave={onEditBooleanOptionSave}/>
            );
            break;
        }

        case "text": {
            answerTypeDetails = null;
            break;
        }

        default:
        // do nothing
    }

    let {onTextFieldChanged} = questionFunctions;
    let onAnswerTypeChanged = questionFunctions.onQuestionTypeSelectionChanged;

    let conditionalToggleText = (
        isQuestionTextConditional ? <span className="glyphicon glyphicon-minus"></span> : <span className="glyphicon glyphicon-plus"></span>
    );

    let toggleToolTip = (
        isQuestionTextConditional ? "Click to restore common text for Employers and Resources" : "Click to add alternate text for Resources"
    );

    let labelForFirstTextField = (
        isQuestionTextConditional ? "Text for Employers" : "Text"
    );

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{pageTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form horizontal styleName="editForm">

                    <FormGroup controlId="formControlsQuestionName">
                        <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Name</Col>
                        <Col sm={11} styleName="inlineTextCol">
                            <FormControl name="name" type="text" placeholder="add name" value={question.name}
                                     onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsQuestionText">
                        <ControlLabel>{labelForFirstTextField}</ControlLabel>
                        <div styleName="conditionalToggle">
                            <a onClick={onToggleConditionalQuestionText} title={toggleToolTip}>{conditionalToggleText}</a>
                        </div>
                        <FormControl name="text" componentClass="textarea" placeholder="add text" value={question.text}
                                required onChange={onTextFieldChanged}/>
                    </FormGroup>

                    <FormGroup controlId="formControlsQuestionAlternateText" styleName={createResourcesTextStyleName()}>
                        <ControlLabel>Alternate Text for Resources</ControlLabel>

                        <FormControl name="textForResources" componentClass="textarea" placeholder="add text" value={question.textForResources}
                                     onChange={onTextFieldChanged}/>
                    </FormGroup>

                    <FormGroup controlId="formControlsQuestionType">
                        <Radio value="singleSelect" checked={answerType === "singleSelect"}
                               onChange={onAnswerTypeChanged}>Single Select</Radio>
                        <Radio value="multiSelect" checked={answerType === "multiSelect"}
                               onChange={onAnswerTypeChanged}>Multiple Select</Radio>
                        <Radio value="boolean" checked={answerType === "boolean"}
                               onChange={onAnswerTypeChanged}>Boolean</Radio>
                        <Radio value="text" checked={answerType === "text"}
                               onChange={onAnswerTypeChanged}>Text</Radio>
                    </FormGroup>

                    <div styleName="answerTypeDetails">
                        {answerTypeDetails}
                    </div>


                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col md={3} mdOffset={2}>
                        <Button onClick={questionFunctions.handleCancel}>Cancel</Button>
                    </Col>
                    <Col md={3}>
                        <Button onClick={questionFunctions.handleSubmit}>Save</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </div>
    );


};

QuestionAddEdit.propTypes = {
    question: T.object.isRequired,
    pageTitle: T.string.isRequired,
    questionFunctions: T.object.isRequired,
    selectionOptionFunctions: T.object.isRequired,
    onEditBooleanOptionSave: T.func.isRequired,
    onToggleConditionalQuestionText: T.func.isRequired,
    isQuestionTextConditional: T.bool.isRequired
};

export default CSSModules(QuestionAddEdit, styles);
