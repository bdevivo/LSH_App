import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import QSetQuestionAddEdit from './QSetQuestionAddEdit';
import update from 'immutability-helper';
import {alertError, confirm} from '../../../utils/confirm';
import * as questionHelpers from '../../../utils/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

class QSetQuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        // initial state for "Add Conditional Question" button is:
        // * disabled if this is a new QSet (because user has to choose Question first)
        // * enabled otherwise ((because for existing QSets, Question has already been specified)
        let canAddConditionalQuestion = this.props.qSetQuestion.id != '0';

        let qSetQuestion = this.props.qSetQuestion;
        qSetQuestion.potentialResponses = this.getPotentialResponses(qSetQuestion.questionId, this.props.questions);

        this.state = {
            qSetQuestion: this.props.qSetQuestion,
            questions: this.props.questions,
            canAddConditionalQuestion: canAddConditionalQuestion,
            isQSetChanged: false
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.getPotentialResponses = this.getPotentialResponses.bind(this);
        this.onQuestionChanged = this.onQuestionChanged.bind(this);
        this.addConditionalQuestion = this.addConditionalQuestion.bind(this);
        this.saveConditionalQuestion = this.saveConditionalQuestion.bind(this);
        this.cancelConditionalQuestion = this.cancelConditionalQuestion.bind(this);
        this.removeConditionalQuestion = this.removeConditionalQuestion.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.removeQSetQuestion = this.removeQSetQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        let nextQSetQuestion = nextProps.qSetQuestion;

        // restore properties that are stored in local state
        let questionId = this.state.qSetQuestion.questionId;
        nextQSetQuestion.potentialResponses = this.getPotentialResponses(questionId, nextProps.questions);
        nextQSetQuestion.questionId = questionId;

        this.setState({
            qSetQuestion: nextQSetQuestion,
            questions: nextProps.questions
            //isQSetChanged: false
        });
    }

    onQuestionChanged(event) {

        let potentialResponses = this.getPotentialResponses(event.target.value, this.state.questions);

        let newState = update(this.state, {
            qSetQuestion: {
                questionId: {$set: event.target.value},
                potentialResponses: {$set: potentialResponses}
            },
            isQSetChanged: {$set: true},
            canAddConditionalQuestion: {$set: true}
        });

        this.setState(newState);
    }

    getPotentialResponses(questionId, questions) {
        if (questionId == '0') {
            return [];
        }

        let fullQuestion = questions.find(q => q._id == questionId);
        return questionHelpers.getPotentialResponses(fullQuestion);
    }

    addConditionalQuestion() {

        let newState = update(this.state, {
            canAddConditionalQuestion: {$set: false}  // disable addition of new Conditional Questions until this one is saved or canceled
            //isQSetChanged: {$set: true}
        });

        this.setState(newState);
        this.props.questionSetFunctions.addConditionalQuestion(this.state.qSetQuestion.id);
    }

    saveConditionalQuestion(conditionalQuestion) {
        this.setState(update(this.state,
            {
                canAddConditionalQuestion: {$set: true},
                isQSetChanged: {$set: false}
            }));

        this.props.questionSetFunctions.saveConditionalQuestion(this.state.qSetQuestion.id, conditionalQuestion);
    }

    cancelConditionalQuestion(qSetQuestionId, originalConditionalQuestion) {
        this.setState(update(this.state,
            {
                canAddConditionalQuestion: {$set: true},
                isQSetChanged: {$set: false}
            }));

        this.props.questionSetFunctions.cancelConditionalQuestion(qSetQuestionId, originalConditionalQuestion);
    }

    removeConditionalQuestion(cQuestionId) {
        let newState = update(this.state, {
            canAddConditionalQuestion: {$set: true}
        });
        this.setState(newState);

        this.props.questionSetFunctions.removeConditionalQuestion(this.state.qSetQuestion.id, cQuestionId);
    }

    onSave() {
        this.setState(update(this.state,
            {
                isQSetChanged: {$set: false}
            }));

        this.props.questionSetFunctions.saveQSetQuestion(this.state.qSetQuestion);
    }

    onCancel() {
        if (this.state.qSetQuestion.id == '0') {  // this is a new qSetQuestion that hasn't been saved yet
            this.removeQSetQuestion('0');
        }
        else {  // this is an existing qSetQuestion that was edited, but the edit was canceled
            let newState = update(this.state, {
                qSetQuestion: {$set: this.props.qSetQuestion},
                isQSetChanged: {$set: false}
            });

            this.setState(newState);
        }
    }

    onRemove() {
        this.removeQSetQuestion(this.state.qSetQuestion.id);
    }

    removeQSetQuestion(qSetQuestionId) {

        this.props.questionSetFunctions.removeQSetQuestion(qSetQuestionId);
    }


    render() {

        let qSetQuestion = this.state.qSetQuestion;

        let qSetQuestionFunctions = {
            onSave: this.onSave,
            onCancel: this.onCancel,
            onRemove: this.onRemove,
            addConditionalQuestion: this.addConditionalQuestion,
            saveConditionalQuestion: this.saveConditionalQuestion,
            cancelConditionalQuestion: this.cancelConditionalQuestion,
            removeConditionalQuestion: this.removeConditionalQuestion,
            onQuestionChanged: this.onQuestionChanged,
        };

        let isAddMode = (qSetQuestion.id == '0' || this.state.isQSetChanged);

            // Don't enable Save button unless form is valid
        //let isSaveEnabled = this.state.isQSetChanged && qSetQuestion.questionId != 0;
        //let isSaveEnabled = this.state.isQSetChanged;

        // Save button is only enabled if
        // * A JobPosting Question has been selected
        //  AND
        // * There are no Conditional Questions
        //  OR
        // * Each Conditional Question is in a saved state

        let conditionalQuestionCount = qSetQuestion.conditionalQuestions.length;
        let hasConditionalQuestions = (conditionalQuestionCount > 0);
        let hasUnsavedConditionQuestions = false;
        for (let i = 0; i< conditionalQuestionCount; i++) {
            let cq = qSetQuestion.conditionalQuestions[i];
            if (cq.responseId == '0' || cq.targetQuestionId == '0') {
                hasUnsavedConditionQuestions = true;
                break;
            }
        }
        let isSaveEnabled = (qSetQuestion.questionId != '0'
                && (!hasConditionalQuestions || !hasUnsavedConditionQuestions));

        return (
            <div>
                <QSetQuestionAddEdit
                    qSetQuestion={qSetQuestion}
                    questions={this.state.questions}
                    qSetQuestionFunctions={qSetQuestionFunctions}
                    panelTargets={this.props.panelTargets}
                    canAddConditionalQuestion={this.state.canAddConditionalQuestion}
                    isAddMode={isAddMode}
                    isSaveEnabled={isSaveEnabled} />
            </div>
        );
    }
}

QSetQuestionEditContainer.propTypes = {
    qSetQuestion: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    panelTargets: PropTypes.array.isRequired,
    questionSetFunctions: PropTypes.object.isRequired
};


export default CSSModules(QSetQuestionEditContainer, styles);
