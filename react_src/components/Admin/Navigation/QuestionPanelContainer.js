import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import update from 'immutability-helper';
import QuestionPanel from './QuestionPanel';
import QuestionPanelEditContainer from './QuestionPanelEditContainer';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

const cloneDeep = require('lodash/cloneDeep');

class QuestionPanelContainer extends React.Component {
   constructor(props) {
      super(props);

      let qPanels = [...props.qPanels];
      let panelId = this.props.params.id;
      let currentPanel = qPanels.find(x => x._id === panelId);

      this.state = {
         qPanels: qPanels,
         panelId: panelId,
         currentPanel: currentPanel,
         editPanel: {},
         showModal: false
      };

      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
      this.onAddPanel = this.onAddPanel.bind(this);
      this.onAddPanelClose = this.onAddPanelClose.bind(this);
   }

   componentWillReceiveProps(nextProps) {
      this.setState({qPanel: nextProps.qPanel});
   }

   onAddPanel() {

      // Calculate the index number for the panel to be added
      let nextIndex;
      if (this.state.qPanels.length === 0) {
         nextIndex = 1;
      }
      else {
         let panelIds = this.state.qPanels.map(q => q.index);
         nextIndex = Math.max(...panelIds) + 1;
      }

      let editPanel = {
         _id: 0,
         index: nextIndex,
         name: "",
         header: "",
         subheader: "",
         nextButtonText: ""
      };

      let newState = update(this.state, {
            editPanel: {$set: editPanel},
            showModal: true
         }
      );

      this.setState(newState);
   }

   onAddPanelClose() {

      let newPanel = {};

      let newState = update(this.state, {
            newPanel: {$set: newPanel},
            showModal: false
         }
      );

      this.setState(newState);
   }

   removePanel() {
      confirm(`Delete question ${this.state.question.index}?`).then(() => {
         this.props.questionPanelActions.removePanel(this.state.panelId);
      }, () => {
         // user clicked Cancel -- do nothing
      });
   }

   onEditPanel() {
      let editPanel = cloneDeep(this.state.currentPanel);

      let newState = update(this.state, {
            editPanel: {$set: editPanel},
            showModal: true
         }
      );

      this.setState(newState);
   }


   render() {


      return (
         <div>

            {/* ADD PANEL BUTTONS */}
            <div styleName="addPanelDiv">
               <Button type="button" className="btn btn-sm btn-default" onClick={this.onAddPanel}>Add Question Panel</Button>
            </div>

            {/* STATIC PANEL INFO */}
            <QuestionPanel
               qPanel={this.state.currentPanel}/>

            {/* EDIT/REMOVE PANEL BUTTONS */}
            <div>
               <Button type="button" className="btn btn-xs btn-default" aria-label="Edit" onClick={this.editPanel}>
                  <span className="glyphicon glyphicon-pencil"></span>
               </Button>

               {' '}

               <Button type="button" className="btn btn-xs btn-default" aria-label="Remove"
                       onClick={this.removePanel}>
                  <span className="glyphicon glyphicon-remove"></span>
               </Button>
            </div>


            {/* EDIT MODAL -- ONLY SHOWN WHEN ADDING OR EDITING A PANEL */}
            <QuestionPanelEditContainer  // this is a new question
               qPanel={this.state.editPanel}
               userName={this.props.userName}
               questionPanelActions={this.props.questionPanelActions}
               modalVisible={this.state.showModal}   // if we are adding a new panel, show the Add Panel modal
               onAddPanelClose={this.onAddPanelClose}/>);

         </div>);
   }
}

QuestionPanelContainer.propTypes = {
   qPanels: PropTypes.array.isRequired,
   questionPanelActions: PropTypes.object,
   userName: PropTypes.string,
   params: PropTypes.object.isRequired
};

export default CSSModules(QuestionPanelContainer, styles);
