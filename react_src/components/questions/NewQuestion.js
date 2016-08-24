import React,{Component, PropTypes} from "react";
import QuestionForm from "./QuestionForm";
import AnswerType from '../../constants/AnswerTypeEnum';
import update from "react-addons-update";

class NewQuestion extends Component{

   componentWillMount(){
      this.setState({
         name:"",
         text:"",
         answerType:AnswerType.NONE_SELECTED,
         selectionOptions: []
      });
   }

   handleChange(field, value){
      this.setState({[field]: value});
   }

   handleSubmit(e){
      console.log("NewQuestion: handling submit");
      e.preventDefault();
      this.props.QuestionCallbacks.addQuestion(this.state);
      this.props.history.pushState(null,"/questions");
   }

   handleClose(e){
      this.props.history.pushState(null,"/");
   }

   addSelectionOption(optionString) {
      console.log("addSelectionOption: " + optionString);
      let nextState = update(this.state.selectionOptions, {$push: [optionString]});
      this.setState({selectionOptions: nextState});
   }

   deleteSelectionOption(optionString) {
      let nextState = update(this.state.selectionOptions, {$unshift: [optionString]});
      this.setState({selectionOptions: nextState});
   }

   render(){

      let answerTypeCallbacks = {
         addSelectionOption:this.addSelectionOption.bind(this),
         deleteSelectionOption:this.addSelectionOption.bind(this)
   };

      return (
         <QuestionForm draftQuestion={this.state}
                  buttonLabel="Add Question"
                  handleChange={this.handleChange.bind(this)}
                  handleSubmit={this.handleSubmit.bind(this)}
                  handleClose={this.handleClose.bind(this)}
                 AnswerTypeCallbacks={answerTypeCallbacks}
         />
      );
   }
}

NewQuestion.propTypes = {
   QuestionCallbacks: PropTypes.object,
};

export default NewQuestion;
