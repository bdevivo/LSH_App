import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import QSetQuestionAddEdit from './QSetQuestionAddEdit';
import update from 'immutability-helper';
import {alertError, confirm} from '../../../utils/confirm';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

const cloneDeep = require('lodash/cloneDeep');
const dateFormat = require('dateformat');
const uuidV1 = require('uuid/v1');

class QSetQuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            qSetQuestion: this.props.qSetQuestion,
            questions: this.props.questions,
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
            questions: nextProps.questions
        });
    }

    addQSetQuestion() {
        let newConditionalQuestion = {
            id: 0,
            questionId: 0,
            questionResponseId: 0,
            question: "goto",
            targetQuestionSetId: 0
        };

        let newState = update(this.state, {
            qSetQuestion: {
                conditionalQuestions: {$push: [newConditionalQuestion]}
            },
            canAddConditionalQuestion: {$set: false}  // disable addition of new Conditional Questions until this one is saved or canceled
        });

        this.setState(newState);
    }

    saveNewQSetQuestion(newQuestion) {
        let questionIndex = this.state.qSetQuestion.conditionalQuestions.findIndex(x => x.id == 0);  // the new Question will be the only one with id == 0
        let saveQuestion = cloneDeep(newQuestion);
        saveQuestion.id = uuidV1();    // assign real ID

        let newState = update(this.state, {
                qSetQuestion: {
                    conditionalQuestions: {$splice: [[questionIndex, 1, saveQuestion]]}
                },
                canAddConditionalQuestion: {$set: true}     // restore ability to add new Conditional Questions
            }
        );

        this.setState(newState);
    }

    cancelNewQSetQuestion() {
        // find and remove the ConditionalQuestion whose id == 0
        this.removeConditionalQuestion(0);
    }

    removeQSetQuestion(questionId) {
        let indexToRemove = this.state.qSetQuestion.conditionalQuestions.findIndex(x => x.id === questionId);
        if (indexToRemove > -1) {
            let newState = update(this.state, {
                qSetQuestion: {
                    conditionalQuestions: {$splice: [[indexToRemove, 1]]}
                },
                canAddConditionalQuestion: {$set: true}      // restore ability to add new Conditional Questions
            });

            this.setState(newState);
        }
    }

    addConditionalQuestion() {
        let newConditionalQuestion = {
            id: 0,
            questionId: 0,
            questionResponseId: 0,
            question: "goto",
            targetQuestionSetId: 0
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
        let pageTitle = (qSetQuestion._id === 0 ? "Add QuestionSet" : "Edit QuestionSet " + qSetQuestion.index);

        let qSetQuestionFunctions = {
            addQSetQuestion: this.addQSetQuestion,
            saveNewQSetQuestion: this.saveNewQSetQuestion,
            cancelNewQSetQuestion: this.cancelNewQSetQuestion,
            removeQSetQuestion: this.removeQSetQuestion,
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
    questionQuestionSetQuestions: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onAddQuestionSetClose: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    panelTargets: PropTypes.array.isRequired
};


export default CSSModules(QSetQuestionEditContainer, styles);
