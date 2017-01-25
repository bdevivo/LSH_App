import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal} from 'react-bootstrap';
import QuestionPanelAddEdit from './QuestionPanelAddEdit';
import update from 'immutability-helper';
import * as questionPanelActions from '../../../actions/questionPanelActions';
import {alertError, confirm} from '../../../utils/confirm';

const uuidV1 = require('uuid/v1');
const cloneDeep = require('lodash/cloneDeep');
const dateFormat = require('dateformat');

class QuestionPanelEditContainer extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         qPanel: this.props.qPanel
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.removePanel = this.removePanel.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
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
         this.props.questionPanelActions.addQuestionPanel(savePanel);
      }
      else {
         savePanel.modifiedBy = userName;
         savePanel.modifiedDate = timestamp;
         this.props.questionPanelActions.updateQuestionPanel(savePanel);
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

   removePanel() {
      confirm(`Delete panel ${this.state.question.index}?`).then(() => {
         this.props.questionPanelActions.removeQuestionPanel(this.state.qPanel._id);
      }, () => {
         // user clicked Cancel -- do nothing
      });
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

      let qPanel = this.state.qPanel;
      let pageTitle = (qPanel._id === 0 ? "Add Panel" : "Edit Panel " + qPanel.index);

      let questionPanelFunctions = {
         handleSubmit: this.handleSubmit,
         handleCancel: this.handleCancel,
         onTextFieldChanged: this.onTextFieldChanged
      };

      return (
         <div>
            <Modal backdrop="static" dialogClassName="questionPanelModal" show={this.state.modalVisible}
                   onHide={this.handleCancel}>
               <QuestionPanelAddEdit
                  qPanel={qPanel}
                  pageTitle={pageTitle}
                  questionPanelFunctions={questionPanelFunctions}
               />
            </Modal>



         </div>
      );
   }
}

QuestionPanelEditContainer.propTypes = {
   qPanel: PropTypes.object.isRequired,
   questionPanelActions: PropTypes.object.isRequired,
   modalVisible: PropTypes.bool.isRequired,
   onAddPanelClose: PropTypes.func.isRequired,
   userName: PropTypes.string.isRequired
};


export default QuestionPanelEditContainer;
