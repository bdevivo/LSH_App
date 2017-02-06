import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import QuestionPanelAddEdit from './QuestionSetAddEdit';
import update from 'immutability-helper';
import {alertError, confirm} from '../../../utils/confirm';
import CSSModules from 'react-css-modules';
import styles from './QuestionSet.css';

const cloneDeep = require('lodash/cloneDeep');
const dateFormat = require('dateformat');
const uuidV1 = require('uuid/v1');

class QuestionPanelEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            qPanel: this.props.qPanel,
            questions: this.props.questions,
            canAddConditionalQuestion: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onTextFieldChanged = this.onTextFieldChanged.bind(this);
        this.onUpdateDefaultAction = this.onUpdateDefaultAction.bind(this);
        this.savePanel = this.savePanel.bind(this);
        this.addConditionalAction = this.addConditionalAction.bind(this);
        this.saveNewConditionalAction = this.saveNewConditionalAction.bind(this);
        this.cancelNewConditionalAction = this.cancelNewConditionalAction.bind(this);
        this.removeConditionalAction = this.removeConditionalAction.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            qPanel: nextProps.qPanel,
            questions: nextProps.questions
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let valResult = this.validateNewPanel();
        if (!valResult.isValid) {
            alertError("Save Error", valResult.message);
        }
        else {
            this.savePanel();
        }
    }

    savePanel() {
        let savePanel = cloneDeep(this.state.qPanel);

        let {userName} = this.props;
        let now = new Date();
        let timestamp = dateFormat(now, "mm.dd.yyyy HH:MM:ss");

        if (this.state.qPanel._id == '0') {
            savePanel.addedBy = userName;
            savePanel.addedDate = timestamp;
            this.props.questionPanelActions.addPanel(savePanel);
        }
        else {
            savePanel.modifiedBy = userName;
            savePanel.modifiedDate = timestamp;
            this.props.questionPanelActions.updatePanel(savePanel);
        }

        this.props.onAddPanelClose();
    }

    validateNewPanel() {
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

        let qPanel = this.state.qPanel;

        // Rule #1: must have non-blank name field
        if (qPanel.name.length === 0) {
            return createErrorResult("Panel Name is empty.");
        }

        // Rule #2: must have non-blank header field
       if (qPanel.header.length === 0) {
          return createErrorResult("Panel Header is empty.");
       }

       // Rule #3: must have valid Default Action
       if (qPanel.defaultAction.action === "goto" && !qPanel.defaultAction.target) {
          return createErrorResult("GO TO action must have a target.");
       }

       // Rule #4: Each conditional action must be saved
       for (let i = 0; i < qPanel.conditionalActions.length; i++) {
           if (qPanel.conditionalActions[i].questionId == 0) {
              return createErrorResult("Condition Actions must be saved or canceled.");
           }
       }


        return validationResult;

    }

    handleCancel() {

        // restore original panel
        let newState = update(this.state, {
            qPanel: {$set: this.props.qPanel}
        });

        this.setState(newState);

        this.props.onAddPanelClose();
        //this.closeModal();
    }

    onUpdateDefaultAction(event) {
        let field = event.target.name;
        let newState = update(this.state, {
            qPanel: {
                defaultAction: {
                    [field]: {$set: event.target.value}
                }
            }
        });

        this.setState(newState);
    }

    onTextFieldChanged(event) {
        let field = event.target.name;
        let newState = update(this.state, {
            qPanel: {
                [field]: {$set: event.target.value}
            }
        });

        this.setState(newState);
    }

    addConditionalAction() {
        let newConditionalAction = {
            id: 0,
            questionId: 0,
            questionResponseId: 0,
            action: "goto",
            targetPanelId: 0
        };

        let newState = update(this.state, {
            qPanel: {
                conditionalActions: {$push: [newConditionalAction]}
            },
            canAddConditionalQuestion: {$set: false}  // disable addition of new Conditional Questions until this one is saved or canceled
        });

        this.setState(newState);
    }

    saveNewConditionalAction(newAction) {
        let actionIndex = this.state.qPanel.conditionalActions.findIndex(x => x.id == 0);  // the new Action will be the only one with id == 0
        let saveAction = cloneDeep(newAction);
        saveAction.id = uuidV1();    // assign real ID

        let newState = update(this.state, {
                qPanel: {
                    conditionalActions: {$splice: [[actionIndex, 1, saveAction]]}
                },
                canAddConditionalQuestion: {$set: true}     // restore ability to add new Conditional Questions
            }
        );

        this.setState(newState);
    }

    cancelNewConditionalAction() {
        // find and remove the ConditionalAction whose id == 0
        this.removeConditionalAction(0);
    }

    removeConditionalAction(actionId) {
        let indexToRemove = this.state.qPanel.conditionalActions.findIndex(x => x.id === actionId);
        if (indexToRemove > -1) {
            let newState = update(this.state, {
                qPanel: {
                    conditionalActions: {$splice: [[indexToRemove, 1]]}
                },
                canAddConditionalQuestion: {$set: true}      // restore ability to add new Conditional Questions
            });

            this.setState(newState);
        }
    }


    render() {

        let qPanel = this.state.qPanel;
        let pageTitle = (qPanel._id === 0 ? "Add Panel" : "Edit Panel " + qPanel.index);

        let questionPanelFunctions = {
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            onTextFieldChanged: this.onTextFieldChanged,
            onUpdateDefaultAction: this.onUpdateDefaultAction,
            addConditionalAction: this.addConditionalAction,
            saveNewConditionalAction: this.saveNewConditionalAction,
            cancelNewConditionalAction: this.cancelNewConditionalAction,
            removeConditionalAction: this.removeConditionalAction
        };

        return (
            <div>
                <Modal backdrop="static" dialogClassName="questionPanelModal" show={this.props.modalVisible}
                       onHide={this.handleCancel}>
                    <QuestionPanelAddEdit
                        qPanel={qPanel}
                        questions={this.state.questions}
                        pageTitle={pageTitle}
                        questionPanelFunctions={questionPanelFunctions}
                        panelTargets={this.props.panelTargets}
                        canAddConditionalQuestion={this.state.canAddConditionalQuestion}
                    />
                </Modal>


            </div>
        );
    }
}

QuestionPanelEditContainer.propTypes = {
    qPanel: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    questionPanelActions: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onAddPanelClose: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    panelTargets: PropTypes.array.isRequired
};


export default CSSModules(QuestionPanelEditContainer, styles);
