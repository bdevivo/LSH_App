import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, ButtonGroup, Modal} from 'react-bootstrap';
import QuestionEditContainer from './QuestionEditContainer';
import CSSModules from 'react-css-modules';
import styles from './Question.css';

const Question = ({question, isExpanded, handleToggle, modalVisible, onAddQuestionClose}) => {

    let question_body;
    let questionDetails;
    if (isExpanded) {

        if (question.answerType && question.answerType.includes("Select")) {

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

        let questionType;
        switch(question.answerType) {
            case "singleSelect":
                questionType = "single select";
                break;

            case "multiSelect":
                questionType = "multiple select";
                break;

            case "boolean":
                questionType = "boolean";
                break;

            case "text":
                questionType = "text";
                break;

            default:
                questionType = "none";
                break;
        }


        question_body =
            (<div>
                <p><b>{question.index}: </b> {question.text}</p>
                {question.textForResources.length > 0 && altText}
                <p><b>type:</b> {questionType}</p>
                {questionDetails}
            </div>);
    }
    else {
        question_body =
            (<div>
                <p><b>{question.index}: </b> {question.text}</p>
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


