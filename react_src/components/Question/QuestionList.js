import Question from './Question';
import React, { Component, PropTypes } from 'react';

const QuestionList = ({questions, handleToggle}) => {

    let outerDivStyle = {
        marginTop: 40
    };

      let  questionList = questions.map(
            (q, index) => <Question key={index} question={q} handleToggle={handleToggle} />
        );

    return(
        <div style={outerDivStyle}>
            {questionList}
        </div>
    );

};

QuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default QuestionList;