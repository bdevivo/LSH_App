import React, { PropTypes } from 'react';
import QuestionPanel from './QuestionPanel';
import QuestionPanelEditContainer from './QuestionPanelEditContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionPanelActions from '../../../actions/questionPanelActions';

class QuestionPanelContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         qPanel: this.props.qPanel
      };

      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
   }

   componentWillReceiveProps(nextProps) {
      this.setState({qPanel: nextProps.qPanel});
   }

   render() {
      let qPanel = this.state.qPanel;
      let questionComponent = (qPanel._id !== 0 // this is an existing question
         ? <QuestionPanel
            qPanel={this.state.qPanel}
            modalVisible={this.props.modalVisible}   // if we are editing an existing panel, show the Edit Question modal
            onAddQuestionClose={this.props.onAddQuestionClose} />
         : <QuestionPanelEditContainer  // this is a new question
            question={question}
            modalVisible={true}   // if we are adding a new panel, show the Add Panel modal
            onAddPanelClose={this.props.onAddQuestionClose} />);

      return <div>{questionComponent}</div>;
   }
}

QuestionPanelContainer.propTypes = {
   qPanel: PropTypes.object.isRequired,
   modalVisible: PropTypes.bool.isRequired,
   onAddPanelClose: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
   return {
      qPanels: [...state.questionPanels]
   };
}

function mapDispatchToProps(dispatch) {
   return {
      questionPanelActions: bindActionCreators(questionPanelActions, dispatch)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPanelContainer);
