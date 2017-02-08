import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import QSetQuestionAddEdit from './QSetQuestionAddEdit';
import update from 'immutability-helper';
import {alertError, confirm} from '../../../utils/confirm';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

const cloneDeep = require('lodash/cloneDeep');

class QSetQuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            qSetQuestion: this.props.qSetQuestion,
            allQuestions: this.props.questions,
            canAddConditionalQuestion: true
        };

        this.addQSetQuestion = this.addQSetQuestion.bind(this);
        this.saveNewQSetQuestion = this.saveNewQSetQuestion.bind(this);
        this.cancelNewQSetQuestion = this.cancelNewQSetQuestion.bind(this);
        this.removeQSetQuestion = this.removeQSetQuestion.bind(this);
        this.addConditionalQuestion = this.addConditionalQuestion.bind(this);
        this.setCanAddConditionalQuestion = this.setCanAddConditionalQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            qSetQuestion: nextProps.qSetQuestion,
           allQuestions: nextProps.questions
        });
    }

    addConditionalQuestion() {
        let newConditionalQuestion = {
            id: '0',
            responseId: '0',
            targetQuestionId: '0'
        };

        let newState = update(this.state, {
            qSetQuestion: {
                conditionalQuestions: {$push: [newConditionalQuestion]}
            },
            canAddConditionalQuestion: {$set: false}  // disable addition of new Conditional Questions until this one is saved or canceled
        });

        this.setState(newState);
    }
   

    setCanAddConditionalQuestion(canAdd) {
        this.setState(update(this.state, {canAddConditionalQuestion: {$set: canAdd}}));
    }


    render() {

        let qSetQuestion = this.state.qSetQuestion;
        let pageTitle = (qSetQuestion._id === '0' ? "Add Question Set" : "Edit Question Set ");

        let qSetQuestionFunctions = {
            addConditionalQuestion: this.addConditionalQuestion,
            setCanAddConditionalQuestion: this.setCanAddConditionalQuestion
        };

        return (
            <div>
                <QSetQuestionAddEdit
                    qSetQuestion={qSetQuestion}
                    questions={this.state.questions}
                    pageTitle={pageTitle}
                    qSetQuestionFunctions={qSetQuestionFunctions}
                    panelTargets={this.props.panelTargets}
                    canAddConditionalQuestion={this.state.canAddConditionalQuestion}
                />
            </div>
        );
    }
}

QSetQuestionEditContainer.propTypes = {
    qSetQuestion: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    panelTargets: PropTypes.array.isRequired
};


export default CSSModules(QSetQuestionEditContainer, styles);
