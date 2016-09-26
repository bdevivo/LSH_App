import React,{Component, PropTypes} from "react";
import QuestionForm from "./QuestionForm";

class EditQuestion extends Component{

   componentWillMount(){
      let question = this.props.questions.find((question)=>question.id == this.props.question_id);
      this.setState({question: question});
   }

   handleChange(field, value){
      this.setState({[field]: value});
   }

   handleSubmit(e){
      e.preventDefault();
      this.props.QuestionCallbacks.updateQuestion(this.state);
      this.props.history.pushState(null,"/");
   }

   handleClose(e){
      this.props.history.pushState(null,"/");
   }

   render(){
      return (
         <QuestionForm draftQuestion={this.state}
                   buttonLabel="Edit Question"
                   handleChange={this.handleChange(this)}
                   handleSubmit={this.handleSubmit(this)}
                   handleClose={this.handleClose(this)} />
      );
   }
}

EditQuestion.propTypes = {
   QuestionCallbacks: PropTypes.object,
   AnswerTypeCallbacks: PropTypes.object,
   questions: PropTypes.object,
   question_id: PropTypes.string,
   history: PropTypes.object
};

export default EditQuestion;
