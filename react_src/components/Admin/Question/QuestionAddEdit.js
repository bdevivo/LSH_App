import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import SelectOptionsContainer from "./AnswerTypeSelect/SelectOptionsContainer";
import BooleanForm from './AnswerTypeBoolean/BooleanForm';
import * as questionHelpers from '../../../utils/questionHelpers';
import styles from './Question.css';
import CSSModules from 'react-css-modules';
import * as enums from '../../../utils/enums';

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

    switch(questionHelpers.getQuestionTypeGroup(question)) {

        case "select": {
            answerTypeDetails = (<SelectOptionsContainer
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

        default: {
            answerTypeDetails = null;
            break;
        }
    }

    let {QUESTION_FUNCTION} = enums;

    const questionFunctionList = [
            { value: QUESTION_FUNCTION.None, label: 'none' },
            { value: QUESTION_FUNCTION.JobName, label: 'job name' }
    ];

    let questionFunctionOptions = questionFunctionList.map(func => {
        return <option key={func.value} value={func.value}>{func.label}</option>;
    });

    let {onTextFieldChanged, onQuestionFunctionChanged} = questionFunctions;
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


                    <FormGroup controlId="formControlsSelect">
                        <Col md={2} styleName="inlineLabel">
                            <ControlLabel>Function</ControlLabel>
                        </Col>
                        <Col md={5}>
                            <FormControl componentClass="select" placeholder="select" styleName="selectControl"
                                         value={question.function} onChange={onQuestionFunctionChanged} >
                                {questionFunctionOptions}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsQuestionType">
                        <ControlLabel styleName="inlineLabel">Question Type</ControlLabel>
                    </FormGroup>
                    <FormGroup controlId="formControlsQuestionType">

                        <Col md={6}>
                            <Radio value="buttonGroupSingleChoice" checked={answerType === "buttonGroupSingleChoice"}
                                   onChange={onAnswerTypeChanged}>Single-Select Pushbutton</Radio>

                            <Radio value="buttonGroupMultipleChoice" checked={answerType === "buttonGroupMultipleChoice"}
                                   onChange={onAnswerTypeChanged}>Multi-Select Pushbutton</Radio>

                            {/*<Radio value="boolean" checked={answerType === "boolean"}*/}
                                   {/*onChange={onAnswerTypeChanged}>Boolean</Radio>*/}

                            <Radio value="textInput" checked={answerType === "textInput"}
                                   onChange={onAnswerTypeChanged}>Text</Radio>

                            <Radio value="textareaInput" checked={answerType === "textareaInput"}
                                   onChange={onAnswerTypeChanged}>Text Area</Radio>
                            <Radio value="emailInput" checked={answerType === "emailInput"}
                                   onChange={onAnswerTypeChanged}>Email</Radio>

                        </Col>

                        <Col md={6}>


                            <Radio value="fileInput" checked={answerType === "fileInput"}
                                   onChange={onAnswerTypeChanged}>File Upload</Radio>
                            <Radio value="selectInput" checked={answerType === "selectInput"}
                                   onChange={onAnswerTypeChanged}>Dropdown Select</Radio>
                            <Radio value="checkboxInput" checked={answerType === "checkboxInput"}
                                   onChange={onAnswerTypeChanged}>Single Checkbox</Radio>
                            <Radio value="checkboxOptionsInput" checked={answerType === "checkboxOptionsInput"}
                                   onChange={onAnswerTypeChanged}>Multiple Checkboxes</Radio>
                            <Radio value="radioOptionsInput" checked={answerType === "radioOptionsInput"}
                                   onChange={onAnswerTypeChanged}>Radio Buttons</Radio>

                        </Col>

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
