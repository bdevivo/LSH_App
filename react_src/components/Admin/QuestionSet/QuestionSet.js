import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

const QuestionSet = ({qSetQuestionData}) => {

    let qSetQuestionListItems;
    if (qSetQuestionData) {

        qSetQuestionListItems = qSetQuestionData.map((questionData, i) => {

            let conditionalQuestionDiv = null;
            let conditionalQuestionListItems = questionData.conditionalQuestions.map((cq, j) =>
                <li key={j}>if answer is [{cq.response}] then show question [{cq.targetQuestion}]</li>
            );
            if (conditionalQuestionListItems.length > 0) {

                conditionalQuestionDiv = (
                    <div styleName="conditionalQuestionStaticDiv">
                        <b>Conditional Questions: </b>
                        <div styleName="conditionalQuestionList">
                            <ol>
                                {conditionalQuestionListItems}
                            </ol>
                        </div>
                    </div>);
            }

            return (

                <li key={i} styleName="questionStaticListItem">
                    {questionData.questionName}
                    {conditionalQuestionDiv}
                </li>
            );

        });


    }

    return (

        <div styleName="questionSetStaticDiv">
            <ul>{qSetQuestionListItems}</ul>
        </div>
    );
};


QuestionSet.propTypes = {
    qSetQuestionData: PropTypes.array.isRequired
};

export default CSSModules(QuestionSet, styles);


