import React, {Component, PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import * as questionHelpers from '../../../utils/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './QuestionForm.css';

const QuestionAnswerPanel = ({questions, questionAnswers}) => {

    let questionItems = [];
    Object.keys(questionAnswers).forEach((key) => {
        let question = questions.find(x => x._id === key);
        if (question) {
            let answerString = questionHelpers.getQuestionAnswer(question, questionAnswers[key]);

            if (answerString) {
                questionItems.push(<p key={question._id}><b>{question.name}: </b>{answerString}</p>);
            }
        }
    });


    return (
        <Panel header="Project Details">
            <div styleName="projectDetailItems">
                {questionItems}
            </div>
        </Panel>
    );
};


QuestionAnswerPanel.propTypes = {
    questions: PropTypes.array.isRequired,
    questionAnswers: PropTypes.object.isRequired,
};

export default CSSModules(QuestionAnswerPanel, styles);


