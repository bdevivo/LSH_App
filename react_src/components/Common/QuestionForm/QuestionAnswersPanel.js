import React, {Component, PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './QuestionForm.css';

const QuestionAnswerPanel = ({allQuestions, questionAnswers, orderedAnswers}) => {

    // sort answers into the order in which they were answered
    let orderedQuestions = questionHelpers.gertOrderedQuestionAnswers(allQuestions, questionAnswers, orderedAnswers);
    let orderedQuestionItems = orderedQuestions.map(qItem => {
        return (<p key={qItem.question._id}><b>{qItem.question.name}: </b>{qItem.answerString}</p>);
    });

    return (
        <Panel header="Project Details">
            <div styleName="projectDetailItems">
                {orderedQuestionItems}
            </div>
        </Panel>
    );
};


QuestionAnswerPanel.propTypes = {
    allQuestions: PropTypes.array.isRequired,
    questionAnswers: PropTypes.object.isRequired,
    orderedAnswers: PropTypes.array.isRequired,
};

export default CSSModules(QuestionAnswerPanel, styles);


