import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, ButtonGroup, Modal} from 'react-bootstrap';
import QuestionEditContainer from './QuestionEditContainer';

const Question = ({question, isExpanded, handleToggle}) => {

    let questionDivStyle = {
        paddingTop: 10,
        borderTop: 'solid 1px blue'
    };

    let question_body;
    let questionDetails;
    if (isExpanded) {

        if (question.answerType && question.answerType.includes("Select")) {
            let questionOptions = question.selectOptions.map((opt, i) =>
                <li key={i}>opt</li>
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
                        <label>Text for "yes":</label>
                        {question.booleanOptions.yesText}
                    </p>
                    <p>
                        <label>Text for "no":</label>
                        {question.booleanOptions.noText}
                    </p>
                </div>);
        }

        question_body =
            (<div>
                <p>text: {question.text}</p>
                <p>type: {question.answerType}</p>
                {questionDetails}
            </div>);
    }
    else {
        question_body =
            (<div>
                <p>text: {question.text}</p>
            </div>);
    }

    let buttonSymbol = isExpanded ? "-" : "+";

    return (

        <div style={questionDivStyle}>
            <button onClick={handleToggle}>{buttonSymbol}</button>
            { question_body }

            <QuestionEditContainer question={question} />

        </div>
    );
};


Question.propTypes = {
    question: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired
};

export default Question;


