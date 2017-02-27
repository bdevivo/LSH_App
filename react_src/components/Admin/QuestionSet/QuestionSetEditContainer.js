import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import QuestionSetAddEdit from './QuestionSetAddEdit';
import update from 'immutability-helper';
import {alertError, confirm} from '../../../utils/confirm';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

//const cloneDeep = require('lodash.clonedeep');
let _ = require('lodash');
const dateFormat = require('dateformat');
const uuidV1 = require('uuid/v1');

class QuestionSetEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            qSet: this.props.qSet,
            questions: this.props.questions,
            canAddConditionalQuestion: true,
            canAddQSetQuestion: true
        };


        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.saveQuestionSet = this.saveQuestionSet.bind(this);
        this.validateNewQuestionSet = this.validateNewQuestionSet.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.addQSetQuestion = this.addQSetQuestion.bind(this);
        this.saveQSetQuestion = this.saveQSetQuestion.bind(this);
        this.removeQSetQuestion = this.removeQSetQuestion.bind(this);
        this.onUpdateQuestionPanel = this.onUpdateQuestionPanel.bind(this);

        this.addConditionalQuestion = this.addConditionalQuestion.bind(this);
        this.saveConditionalQuestion = this.saveConditionalQuestion.bind(this);
        this.cancelConditionalQuestion = this.cancelConditionalQuestion.bind(this);
        this.removeConditionalQuestion = this.removeConditionalQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            qSet: nextProps.qSet,
            questions: nextProps.questions
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let valResult = this.validateNewQuestionSet();
        if (!valResult.isValid) {
            alertError("Save Error", valResult.message);
        }
        else {
            this.saveQuestionSet();
        }
    }

    saveQuestionSet() {
        let saveQuestionSet = _.cloneDeep(this.state.qSet);

        let {userName} = this.props;
        let now = new Date();
        let timestamp = dateFormat(now, "mm.dd.yyyy HH:MM:ss");

        if (this.state.qSet._id == '0') {
            saveQuestionSet.addedBy = userName;
            saveQuestionSet.addedDate = timestamp;
            this.props.questionSetActions.addQuestionSet(saveQuestionSet);
        }
        else {
            saveQuestionSet.modifiedBy = userName;
            saveQuestionSet.modifiedDate = timestamp;
            this.props.questionSetActions.updateQuestionSet(saveQuestionSet);
        }

        this.props.onAddSetClose();
    }

    validateNewQuestionSet() {
        let validationResult = {
            isValid: true,
            message: ""
        };

        const createErrorResult = ((msg) => {
            return {
                isValid: false,
                message: msg
            };
        });

        let qSet = this.state.qSet;

        // Rule #1: must have an associated panel
        if (qSet.questionPanelId == '0') {
            return createErrorResult("Question Panel must be selected.");
        }

        // Rule #2: must have at least one Question
        if (qSet.qSetQuestions.length === 0) {
            return createErrorResult("At least one Question must be specified.");
        }

        return validationResult;
    }

    handleCancel() {

        // restore original panel
        let newState = update(this.state, {
            qSet: {$set: this.props.qSet}
        });

        this.setState(newState);

        this.props.onAddSetClose();
        //this.closeModal();
    }

    addQSetQuestion() {
        let newQSetQuestion = {
            id: '0',
            questionId: '0',
            conditionalQuestions: [],
            potentialResponses: []
        };

        let newState = update(this.state, {
            qSet: {
                qSetQuestions: {$push: [newQSetQuestion]}
            },
            canAddQSetQuestion: {$set: false}   // can't add a new QSetQuestion until this one is saved
        });

        this.setState(newState);
    }

    saveQSetQuestion(qSetQuestion) {
        let qSetQuestionIndex = this.state.qSet.qSetQuestions.findIndex(q => q.id === qSetQuestion.id);
        if (qSetQuestionIndex > -1) {

            if (qSetQuestion.id == '0') {  // this is a new Question Set
                qSetQuestion.id = uuidV1();    // assign real ID
            }

            let newState = update(this.state, {
                    qSet: {
                        qSetQuestions: {$splice: [[qSetQuestionIndex, 1, qSetQuestion]]}
                    },
                    canAddQSetQuestion: {$set: true}     // restore ability to add new Conditional Questions
                }
            );

            this.setState(newState);
        }
    }

    removeQSetQuestion(qSetQuestionId) {
        let indexToRemove = this.state.qSet.qSetQuestions.findIndex(x => x.id === qSetQuestionId);
        if (indexToRemove > -1) {
            let newState = update(this.state, {
                    qSet: {
                        qSetQuestions: {$splice: [[indexToRemove, 1]]}
                    },
                    canAddQSetQuestion: {$set: true}     // restore ability to add new Conditional Questions
                }
            );

            this.setState(newState);
        }
    }

    onUpdateQuestionPanel(event) {
        let newState = update(this.state, {
            qSet: {
                questionPanelId: {$set: event.target.value}
            }
        });

        this.setState(newState);
    }

    addConditionalQuestion(qSetQuestionId) {

        let qSetQuestionIndex = this.state.qSet.qSetQuestions.findIndex(q => q.id === qSetQuestionId);
        if (qSetQuestionIndex == -1) {
            return;
        }

        let newConditionalQuestion = {
            id: '0',
            responseId: '0',
            targetQuestionId: '0'
        };

        let newState = update(this.state, {
                qSet: {
                    qSetQuestions: {
                        [qSetQuestionIndex]: {
                            conditionalQuestions: {$push: [newConditionalQuestion]}
                        }
                    }
                },
                canAddConditionalQuestion: {$set: false},
                canAddQSetQuestion: {$set: false}
            }
        );

        this.setState(newState);
    }

    saveConditionalQuestion(qSetQuestionId, conditionalQuestion) {
        let qSetQuestionIndex = this.state.qSet.qSetQuestions.findIndex(q => q.id === qSetQuestionId);
        if (qSetQuestionIndex > -1) {
            let qSetQuestion = this.state.qSet.qSetQuestions[qSetQuestionIndex];
            let cqIndex = qSetQuestion.conditionalQuestions.findIndex(cq => cq.id == conditionalQuestion.id);
            if (cqIndex > -1) {
                if (conditionalQuestion.id == '0') {  // this is a new ConditionalQuestion
                    conditionalQuestion.id = uuidV1();    // assign real ID
                }
                let newState = update(this.state, {
                        qSet: {
                            qSetQuestions: {
                                [qSetQuestionIndex]: {
                                    conditionalQuestions: {$splice: [[cqIndex, 1, conditionalQuestion]]}
                                }
                            }
                        },
                        canAddConditionalQuestion: {$set: true},     // restore ability to add new Conditional Questions
                        canAddQSetQuestion: {$set: true}    // restore ability to add new Question Set Questions
                    }
                );

                this.setState(newState);
            }
        }
    }

    cancelConditionalQuestion(qSetQuestionId, originalConditionalQuestion) {
        if (originalConditionalQuestion.id == '0') {  // this is a new CQ that hasn't been saved yet
            this.removeConditionalQuestion(qSetQuestionId, '0');
        }
        else {  // this is an existing question that was edited, but the edit was canceled
            let qSetQuestionIndex = this.state.qSet.qSetQuestions.findIndex(q => q.id === qSetQuestionId);
            if (qSetQuestionIndex > -1) {
                let qSetQuestion = this.state.qSet.qSetQuestions[qSetQuestionIndex];
                let cqIndex = qSetQuestion.conditionalQuestions.findIndex(cq => cq.id == originalConditionalQuestion.id);
                if (cqIndex > -1) {
                    let newState = update(this.state, {
                            qSet: {
                                qSetQuestions: {
                                    [qSetQuestionIndex]: {
                                        conditionalQuestions: {$splice: [[cqIndex, 1, originalConditionalQuestion]]}
                                    }
                                }
                            },
                            canAddConditionalQuestion: {$set: true},    // restore ability to add new Conditional Questions
                            canAddQSetQuestion: {$set: true}    // restore ability to add new Question Set Questions
                        }
                    );

                    this.setState(newState);
                }
            }
        }
    }

    removeConditionalQuestion(qSetQuestionId, cqId) {
        let qSetQuestionIndex = this.state.qSet.qSetQuestions.findIndex(q => q.id === qSetQuestionId);
        if (qSetQuestionIndex > -1) {
            let qSetQuestion = this.state.qSet.qSetQuestions[qSetQuestionIndex];
            let cqIndex = qSetQuestion.conditionalQuestions.findIndex(cq => cq.id == cqId);
            if (cqIndex > -1) {
                let newState = update(this.state, {
                        qSet: {
                            qSetQuestions: {
                                [qSetQuestionIndex]: {
                                    conditionalQuestions: {$splice: [[cqIndex, 1]]}
                                }
                            }
                        },
                        canAddConditionalQuestion: {$set: true},     // restore ability to add new Conditional Questions
                        canAddQSetQuestion: {$set: true}    // restore ability to add new Question Set Questions
                    }
                );

                this.setState(newState);
            }
        }
    }


    render() {

        let qSet = this.state.qSet;
        let pageTitle = (qSet._id === 0 ? "Add Question Set" : "Edit Question Set");

        let questionSetFunctions = {
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            addQSetQuestion: this.addQSetQuestion,
            saveQSetQuestion: this.saveQSetQuestion,
            removeQSetQuestion: this.removeQSetQuestion,
            onUpdateQuestionPanel: this.onUpdateQuestionPanel,
            addConditionalQuestion: this.addConditionalQuestion,
            saveConditionalQuestion: this.saveConditionalQuestion,
            cancelConditionalQuestion: this.cancelConditionalQuestion,
            removeConditionalQuestion: this.removeConditionalQuestion,
        };

        return (
            <div>
                <Modal backdrop="static" dialogClassName="questionSetModal" show={this.props.modalVisible}
                       onHide={this.handleCancel}>
                    <QuestionSetAddEdit
                        questionSet={qSet}
                        questions={this.state.questions}
                        pageTitle={pageTitle}
                        questionSetFunctions={questionSetFunctions}
                        panelTargets={this.props.panelTargets}
                        canAddConditionalQuestion={this.state.canAddConditionalQuestion}
                        canAddQSetQuestion={this.state.canAddQSetQuestion}
                    />
                </Modal>


            </div>
        );
    }
}

QuestionSetEditContainer.propTypes = {
    qSet: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    questionSetActions: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onAddSetClose: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    panelTargets: PropTypes.array.isRequired
};


export default CSSModules(QuestionSetEditContainer, styles);
