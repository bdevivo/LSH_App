import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, ButtonGroup, Modal} from 'react-bootstrap';
import QuestionEditContainer from './QuestionEditContainer';
import * as questionHelpers from '../../../utils/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './Question.css';

const Question = ({question, isExpanded, handleToggle, modalVisible, onAddQuestionClose}) => {

    let question_body;
    let questionDetails;
    if (isExpanded) {

        if (questionHelpers.questionHasSelectOptions(question)) {
            let sortedOptions = question.selectOptionItems.sort((a, b) => { return a.index - b.index; });
            let questionOptions = sortedOptions.map((opt, i) =>
                <li key={i}>{opt.text}</li>
            );

            questionDetails = (
                <div>
                    <label>Options</label>
                    <ul>{questionOptions}</ul>
                </div>);
        }
        else if (question.answerType === "boolean") {
            questionDetails = (
                <div>
                    <p>
                        <label>Text for "yes" option: </label>
                        {' '}
                        {question.booleanOptions.yesText}
                    </p>
                    <p>
                        <label>Text for "no" option: </label>
                        {' '}
                        {question.booleanOptions.noText}
                    </p>
                </div>);
        }

        let altText = (<p><b>Alternate text for resources: </b> {question.textForResources}</p>);
        let questionType = questionHelpers.getAnswerTypeDisplayString(question.answerType);
        let questionFunction = question.hasOwnProperty("function") && question.function !== "none"
            ? <p><b>Function:</b> {question.function}</p>
            : null;

        question_body =
            (<div>
                <p><b>{question.index}: </b> {question.name}</p>
                <p><b>Text: </b> {question.text}</p>
                {question.textForResources.length > 0 && altText}
                {questionFunction}
                <p><b>Type:</b> {questionType}</p>
                {questionDetails}
            </div>);
    }
    else { // question is collapsed
        question_body =
            (<div>
                <p><b>{question.index}: </b> {question.name}</p>
            </div>);
    }

    let buttonSymbol = isExpanded ? "-" : "+";

    return (

        <Row styleName="questionDiv">
            <Col md={1} styleName="toggleButtonCol">
                <Button className="btn btn-xs btn-default" onClick={handleToggle}>{buttonSymbol}</Button>
            </Col>

            <Col md={6} styleName="questionBodyDiv">
                { question_body }
            </Col>

            <Col md={2}>
                <QuestionEditContainer question={question} modalVisible={modalVisible} onAddQuestionClose={onAddQuestionClose} />
            </Col>

        </Row>
    );
};


Question.propTypes = {
    question: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onAddQuestionClose: PropTypes.func.isRequired
};

export default CSSModules(Question, styles);


