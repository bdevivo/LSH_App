import React,{Component, PropTypes} from "react";
import QuestionForm from "./QuestionForm"

class NewQuestion extends Component{

   componentWillMount(){
      this.setState({
         id: Date.now(),
         name:"",
         text:"",
         answerType:"none"
      });
   }

   handleChange(field, value){
      this.setState({[field]: value});
   }

   handleSubmit(e){
      e.preventDefault();
      this.props.QuestionCallbacks.addQuestion(this.state);
      this.props.history.pushState(null,"/");
   }

   handleClose(e){
      this.props.history.pushState(null,"/");
   }

   render(){
      return (
         <QuestionForm draftQuestion={this.state}
                   buttonLabel="Add Question"
                   handleChange={this.handleChange.bind(this)}
                   handleSubmit={this.handleSubmit.bind(this)}
                   handleClose={this.handleClose.bind(this)} />
      );
   }
}

NewQuestion.propTypes = {
   QuestionCallbacks: PropTypes.object
};

export default NewQuestion;
