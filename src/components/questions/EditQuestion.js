import React,{Component, PropTypes} from "react";
import QuestionForm from "./QuestionForm";

class EditQuestion extends Component{

   componentWillMount(){
      let question = this.props.questions.find((question)=>question.id == this.props.params.question_id);
      this.setState({question: question});
   }

   handleChange(field, value){
      this.setState({[field]: value});
   }

   handleSubmit(e){
      e.preventDefault();
      this.props.questionCallbacks.updateQuestion(this.state);
      this.props.history.pushState(null,"/");
   }

   handleClose(e){
      this.props.history.pushState(null,"/");
   }

   render(){
      return (
         <QuestionForm draftQuestion={this.state}
                   buttonLabel="Edit Question"
                   handleChange={this.handleChange.bind(this)}
                   handleSubmit={this.handleSubmit.bind(this)}
                   handleClose={this.handleClose.bind(this)} />
      )
   }
}

EditQuestion.propTypes = {
   questionCallbacks: PropTypes.object,
   questions: PropTypes.object
};

export default EditQuestion;
