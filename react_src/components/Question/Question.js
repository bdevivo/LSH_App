import React, { Component, PropTypes } from 'react';

const Question = ({question, handleToggle}) => {

    let questionDivStyle = {
        paddingTop: 10,
        borderTop: 'solid 1px blue'
    };

    function onToggle(){
        handleToggle(question.id);
    }

    let question_body;
    if (question.visible)
    {
        question_body =
            (<div>
                <p>name: {question.name}</p>
                <p>id: {question.id}</p>
                <p>other question info</p>
            </div>);
    }
    else
    {
        question_body =
            (<div>
                <p>name: {question.name}</p>
            </div>);
    }

    let buttonSymbol = question.visible ? "-" : "+";

    return(

        <div style={questionDivStyle}>
            <button onClick={onToggle}>{buttonSymbol}</button>
            { question_body }
        </div>
    );
};


Question.propTypes = {
    question: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default Question;


