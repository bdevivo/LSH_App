import React, { PropTypes } from 'react';
import Question from './Question';
import QuestionEditContainer from './QuestionEditContainer';

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
            question={this.state.question}
            modalVisible={this.props.modalVisible}   // if we are editing an existing question, show the Edit Question modal
            onAddQuestionClose={this.props.onAddQuestionClose} />
         : <QuestionPanelContainer  // this is a new question
            question={question}
            modalVisible={true}   // if we are adding a new question, show the Add Question modal
            onAddPanelClose={this.props.onAddQuestionClose} />);

      return <div>{questionComponent}</div>;
   }
}

QuestionPanelContainer.propTypes = {
   qPanel: PropTypes.object.isRequired,
   modalVisible: PropTypes.bool.isRequired,
   onAddPanelClose: PropTypes.func.isRequired
};


export default QuestionPanelContainer;
