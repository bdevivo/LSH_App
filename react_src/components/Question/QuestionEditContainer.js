import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonGroup, Modal} from 'react-bootstrap';
import QuestionAddEdit from './QuestionAddEdit';
import update from 'immutability-helper';
import * as questionActions from '../../actions/questionWizardActions';

const uuidV1 = require('uuid/v1');

class QuestionEditContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            question: this.props.question,
            modalVisible: false,
            selectedQuestionOption: "none"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onQuestionTypeSelectionChanged = this.onQuestionTypeSelectionChanged.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();


        if (this.state.question.id == 0) {
            this.props.questionActions.addQuestion(this.state.question);
        }
        else {
            this.props.questionActions.updateQuestion(this.state.question);
        }

        this.closeModal();
    }

    removeQuestion() {

        this.props.questionActions.removeQuestion(this.state.question.id);
    }

    handleCancel() {
        this.closeModal();
    }

    showModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    onQuestionTextChanged(event) {
       this.setState(
          {question:
            {text: event.target.value}});
    }

    onQuestionTypeSelectionChanged(event) {
        this.setState({selectedQuestionOption: event.target.value});
    }

   onAddSelectionOption(itemText) {

       let question = this.state.question;

      let newId = uuidV1();
      let newIndex = question.optionItems.length;    // 0-based index
      let newItem = {
         text: itemText,
         id: newId,
         index: newIndex
      };

      this.setState(update(question, {
         options: {$push: newItem}
      }));
   }

   onDeleteSelectionOption(itemId) {
      let question = this.state.question;

      let delItem = question.optionItems.filter(item => item.id === itemId)[0];
      this.setState(update(question.optionItems, {$splice: [[delItem.index, 1]]}));

      //re-index to keep index numbers contiguous
      for(let i = 0; i < question.optionItems.length; i++) {
         question.optionItems[i].index = i;
      }
   }

   onEditSelectionOptionSave(editedItem) {
      let question = this.state.question;
      let editItem = question.optionItems.filter(item => item.id === editedItem.id)[0];
      this.setState(update(editItem, {$set: editedItem.text}));
   }


    render() {

        let question = this.state.question;
        let pageTitle = (question.id === 0 ? "Add Question" : "Edit Question");

        return (
            <div>

                <Modal dialogClassName="questionModal" show={this.state.modalVisible} onHide={this.closeModal}>
                    <QuestionAddEdit
                        question={question}
                        pageTitle={pageTitle}
                        handleSubmit={this.handleSubmit}
                        handleCancel={this.handleCancel}
                        onQuestionTextChanged={this.onQuestionTextChanged}
                        selectedQuestionOption={this.state.selectedQuestionOption}
                        onQuestionTypeSelectionChanged={this.onQuestionTypeSelectionChanged}
                        onAddSelectOption={this.onAddSelectionOption}
                        onDeleteSelectionOption={this.onDeleteSelectionOption}
                        onEditSelectionOptionSave={this.onEditSelectionOptionSave}
                    />
                </Modal>

                <ButtonGroup>

                    <Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={this.showModal}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </Button>

                    <Button type="button" className="btn btn-sm btn-default" aria-label="Remove"
                            onClick={this.removeQuestion}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                </ButtonGroup>


            </div>


        );
    }
}

QuestionEditContainer.propTypes = {
    question: PropTypes.object.isRequired,
    questionActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        questionActions: bindActionCreators(questionActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(QuestionEditContainer);
