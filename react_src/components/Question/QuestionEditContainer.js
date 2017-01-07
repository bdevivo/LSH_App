import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal} from 'react-bootstrap';
import QuestionAddEdit from './QuestionAddEdit';
import update from 'immutability-helper';
import * as questionActions from '../../actions/questionActions';
import {alertError, confirm} from '../../utils/confirm';

const uuidV1 = require('uuid/v1');
const cloneDeep = require('lodash/cloneDeep');
const dateFormat = require('dateformat');

class QuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            question: this.props.question,
            reOrderedOptionItems: this.props.question.selectOptionItems,
            areOptionsReordered: false,
            modalVisible: this.props.modalVisible,
            isQuestionTextConditional: this.props.question.textForResources.length > 0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onTextFieldChanged = this.onTextFieldChanged.bind(this);
        this.onQuestionTypeSelectionChanged = this.onQuestionTypeSelectionChanged.bind(this);
        this.onAddSelectionOption = this.onAddSelectionOption.bind(this);
        this.onDeleteSelectionOption = this.onDeleteSelectionOption.bind(this);
        this.onEditSelectionOptionSave = this.onEditSelectionOptionSave.bind(this);
        this.reOrderOptionItems = this.reOrderOptionItems.bind(this);
        this.onEditBooleanOptionSave = this.onEditBooleanOptionSave.bind(this);
        this.clearOtherAnswerTypes = this.clearOtherAnswerTypes.bind(this);
        this.onToggleConditionalQuestionText = this.onToggleConditionalQuestionText.bind(this);
        this.onToggleConditionalQuestionText = this.onToggleConditionalQuestionText.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.question !== this.state.question) {
            this.setState(
                {
                    question: nextProps.question,
                    reOrderedOptionItems: nextProps.question.selectOptionItems,
                    areOptionsReordered: false,
                });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let valResult = this.validateNewQuestion();
        if (!valResult.isValid) {
            alertError("Save Error", valResult.message);
        }
        else {
            this.saveQuestion();
        }
    }

    saveQuestion() {
        let saveQuestion = cloneDeep(this.state.question);
        this.clearOtherAnswerTypes(saveQuestion);
        if (!this.state.isQuestionTextConditional) {
            // remove question text for Resources
            saveQuestion.textForResources = "";
        }

        let optionItemsCopy = cloneDeep(this.state.reOrderedOptionItems);
        if (this.state.areOptionsReordered) {
            //re-index to keep index numbers in sync with array order (in case items were re-ordered by dragging)
            for (let i = 0; i < optionItemsCopy.length; i++) {
                optionItemsCopy[i].index = i;
            }
            saveQuestion.selectOptionItems = optionItemsCopy;
        }

        let {userName} = this.props;
        let now = new Date();
        let timestamp = dateFormat(now, "mm.dd.yyyy HH:MM:ss");

        if (this.state.question._id == 0) {
            saveQuestion.addedBy = userName;
            saveQuestion.addedDate = timestamp;
            this.props.questionActions.addQuestion(saveQuestion);
        }
        else {
            saveQuestion.modifiedBy = userName;
            saveQuestion.modifiedDate = timestamp;
            this.props.questionActions.updateQuestion(saveQuestion);
        }

        this.props.onAddQuestionClose();
        this.closeModal();
    }

    validateNewQuestion() {
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

        let question = this.state.question;

        // Rule #1: must have non-blank text field
        if (question.text.length === 0) {
            return createErrorResult("Question Text is empty.");
        }

        // Rule #2: if there is conditional text, the alternate text must be non-blank
        if (this.state.isQuestionTextConditional && question.textForResources.length === 0) {
            return createErrorResult("Alternate Text for Resources is empty.");
        }

        // Rule #3: one of the answer types must be selected
        if (question.answerType === "none") {
            return createErrorResult("Answer type is not specified.");
        }

        // Rule #4: if answer type is Single Select or Multi Select, at least one option must be added
        if (question.answerType.includes("Select") && question.selectOptionItems.length === 0) {
            return createErrorResult("At least one select option must be specified");
        }

        // Rule #5: if answer type is Boolean, Yes text prompt mus tbe specified
        if (question.answerType.includes("boolean") && question.booleanOptions.yesText.length === 0) {
            return createErrorResult('Text for "Yes" option is empty.');
        }

        // Rule #6: if answer type is Boolean, No text prompt must tbe specified
        if (question.answerType.includes("boolean") && question.booleanOptions.noText.length === 0) {
            return createErrorResult('Text for "No" option is empty.');
        }

        return validationResult;

    }

    clearOtherAnswerTypes(question) {
        if (!question.answerType.includes("Select")) {
            delete question.selectOptionItems;
        }
        else if (!question.answerType.includes("boolean")) {
            delete question.booleanOptions;
        }
    }

    handleCancel() {

        // restore original question
        let newState = update(this.state, {
            question: {$set: this.props.question}
        });

        this.setState(newState);

        this.props.onAddQuestionClose();
        this.closeModal();
    }

    removeQuestion() {
        confirm(`Delete question ${this.state.question.index}?`).then(() => {
            this.props.questionActions.removeQuestion(this.state.question._id);
        }, () => {
            // user clicked Cancel -- do nothing
        });
    }

    showModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    onTextFieldChanged(event) {
        let field = event.target.name;
        let newState = update(this.state, {
            question: {
                [field]: {$set: event.target.value}
            }
        });

        this.setState(newState);
    }

    onQuestionTypeSelectionChanged(event) {
        let newAnswerType = event.target.value;

        let newState = update(this.state, {
            question: {
                answerType: {$set: newAnswerType}
            }
        });

        // initialize answer-type options
        if (newAnswerType.includes("Select") && typeof(newState.question.selectOptionItems) == 'undefined') {
            newState.question.selectOptionItems = [];
        }
        else if (newAnswerType == "boolean" && typeof(newState.question.booleanOptions) == 'undefined') {
            newState.question.booleanOptions = {
                yesText: "",
                noText: ""
            };
        }

        this.setState(newState);
    }

    onAddSelectionOption(itemText) {

        let question = this.state.question;

        let newId = uuidV1();
        let newIndex = question.selectOptionItems.length;    // 0-based index
        let newItem = {
            text: itemText,
            id: newId,
            index: newIndex
        };

        let newState = update(this.state, {
            question: {
                selectOptionItems: {$push: [newItem]}
            }
        });

        this.setState(newState);
    }

    onDeleteSelectionOption(itemId) {
        let question = this.state.question;

        let index = question.selectOptionItems.findIndex(item => item.id === itemId);
        if (index > -1) {
            let newState = update(this.state, {
                question: {selectOptionItems: {$splice: [[index, 1]]}}
            });

            //re-index to keep index numbers contiguous (but don't apply until save)
            let orderedItems = [];
            let oldItems = newState.question.selectOptionItems;
            for (let i = 0; i < oldItems.length; i++) {
                orderedItems.push({
                    index: i,
                    id: oldItems[i].id,
                    text: oldItems[i].text
                });
            }

            newState.reOrderedOptionItems = orderedItems;
            newState.areOptionsReordered = true;

            this.setState(newState);
        }


    }

    onEditSelectionOptionSave(editedItem) {

        let newState = update(this.state, {
                question: {
                    selectOptionItems: {$splice: [[editedItem.index, 1, editedItem]]}
                }
            }
        );

        this.setState(newState);
    }

    reOrderOptionItems(orderedItems) {
        let newState = update(this.state, {
            reOrderedOptionItems: {$set: orderedItems},
            areOptionsReordered: {$set: true}
        });

        this.setState(newState);
    }

    onEditBooleanOptionSave(editedItem) {

        let propName = (editedItem.name === "yes" ? "yesText" : "noText");

        let newState = update(this.state, {
                question: {
                    booleanOptions: {
                        [propName]: {$set: editedItem.text}
                    }
                }
            }
        );

        this.setState(newState);
    }

    onToggleConditionalQuestionText() {

        this.setState(update(this.state, {
                isQuestionTextConditional: {$set: !this.state.isQuestionTextConditional}
            }
        ));
    }

    render() {

        let question = this.state.question;
        let pageTitle = (question._id === 0 ? "Add Question" : "Edit Question " + question.index);

        let questionFunctions = {
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            onTextFieldChanged: this.onTextFieldChanged,
            onQuestionTextChanged: this.onQuestionTextChanged,
            onQuestionTextForResourcesChanged: this.onQuestionTextForResourcesChanged,
            onQuestionTypeSelectionChanged: this.onQuestionTypeSelectionChanged
        };

        let selectionOptionFunctions = {
            onAddSelectOption: this.onAddSelectionOption,
            onDeleteSelectionOption: this.onDeleteSelectionOption,
            onEditSelectionOptionSave: this.onEditSelectionOptionSave,
            reOrderOptionItems: this.reOrderOptionItems
        };

        let buttonGroup = (
            this.state.modalVisible
                ? null
                : <div>
                    <Button type="button" className="btn btn-xs btn-default" aria-label="Edit" onClick={this.showModal}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </Button>

                    {' '}

                    <Button type="button" className="btn btn-xs btn-default" aria-label="Remove"
                            onClick={this.removeQuestion}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </div>
        );

        return (
            <div>
                <Modal backdrop="static" dialogClassName="questionModal" show={this.state.modalVisible}
                       onHide={this.handleCancel}>
                    <QuestionAddEdit
                        question={question}
                        pageTitle={pageTitle}
                        questionFunctions={questionFunctions}
                        selectionOptionFunctions={selectionOptionFunctions}
                        onEditBooleanOptionSave={this.onEditBooleanOptionSave}
                        onToggleConditionalQuestionText={this.onToggleConditionalQuestionText}
                        isQuestionTextConditional={this.state.isQuestionTextConditional}
                    />
                </Modal>

                {buttonGroup}

            </div>
        );
    }
}

QuestionEditContainer.propTypes = {
    question: PropTypes.object.isRequired,
    questionActions: PropTypes.object,
    modalVisible: PropTypes.bool.isRequired,
    onAddQuestionClose: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        userName: state.profile.user_name.short
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditContainer);
