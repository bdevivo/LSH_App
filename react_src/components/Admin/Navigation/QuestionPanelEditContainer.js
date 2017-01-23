import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal} from 'react-bootstrap';
import QuestionAddEdit from './QuestionAddEdit';
import update from 'immutability-helper';
import * as questionActions from '../../../actions/questionActions';
import {alertError, confirm} from '../../../utils/confirm';

const uuidV1 = require('uuid/v1');
const cloneDeep = require('lodash/cloneDeep');
const dateFormat = require('dateformat');

class QuestionPanelEditContainer extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         qPanel: this.props.question,
         modalVisible: this.props.modalVisible,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.removePanel = this.removePanel.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.showModal = this.showModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.onTextFieldChanged = this.onTextFieldChanged.bind(this);
      this.savePanel = this.savePanel.bind(this);
   }

   componentWillReceiveProps(nextProps) {
      this.setState({ qPanel: nextProps.qPanel });
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

      if (this.state.qPanel._id == 0) {
         savePanel.addedBy = userName;
         savePanel.addedDate = timestamp;
         this.props.questionActions.addQuestionPanel(savePanel);
      }
      else {
         savePanel.modifiedBy = userName;
         savePanel.modifiedDate = timestamp;
         this.props.questionActions.updateQuestionPanel(savePanel);
      }

      this.props.onAddPanelClose();
      this.closeModal();
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

      // Rule #2: if there is conditional text, the alternate text must be non-blank
      // etc.

      return validationResult;

   }

   handleCancel() {

      // restore original panel
      let newState = update(this.state, {
         qPanel: {$set: this.props.qPanel}
      });

      this.setState(newState);

      this.props.onAddPanelClose();
      this.closeModal();
   }

   removeQuestion() {
      confirm(`Delete panel ${this.state.question.index}?`).then(() => {
         this.props.questionActions.removeQuestionPanel(this.state.qPanel._id);
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
         qPanel: {
            [field]: {$set: event.target.value}
         }
      });

      this.setState(newState);
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

QuestionPanelEditContainer.propTypes = {
   question: PropTypes.object.isRequired,
   questionActions: PropTypes.object,
   modalVisible: PropTypes.bool.isRequired,
   onAddQuestionClose: PropTypes.func.isRequired,
   userName: PropTypes.string
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPanelEditContainer);
