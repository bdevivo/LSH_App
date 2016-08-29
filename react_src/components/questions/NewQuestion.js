import React,{Component, PropTypes} from "react";
import QuestionForm from "./QuestionForm";
import AnswerType from '../../constants/AnswerTypeEnum';
import update from "react-addons-update";
import { Router } from 'react-router';

var deep = require('deep-get-set');

class NewQuestion extends Component{

    componentWillMount(){
      this.setState({
            name:"",
            text:"",
            answerType:AnswerType.NONE_SELECTED,
            selectionOptions: [],
            topLevel: true,
            textOptions: {
                width: 100,
                multiLine: false,
                numeric: false
            }
      });
   }

   handleChange(field, value){
      console.log("handleChange: changing " + field + " to " + value);
      this.setState({[field]: value});
   }

   handleCheckChange(field) {
        let currentCheckState = this.state[field];
        console.log("NewQuestion.handleCheckChange: current state is: " + currentCheckState);
        this.setState({[field]: !currentCheckState});
   }

   handleTextOptionChange(field, value, isCheckBox) {
       if (isCheckBox) {
           let currentCheckState = deep(this.state, 'textOptions.multiLine' );        //this.state.textOptions[field];
           console.log("NewQuestion.handleTextOptionChange: current state of textOptions." + field + " = " + currentCheckState);

           let nextState = update(this.state.textOptions, {$merge: {[field]: !currentCheckState}});
           this.setState({textOptions: nextState});
           console.log("NewQuestion.handleTextOptionChange: set textOptions." + field + " to " + this.state.textOptions[field]);
       }
       else {
           console.log("NewQuestion.handleTextOptionChange: setting textOptions." + field + " to " + value);
           let nextState = update(this.state.textOptions, {$merge: {[field]: value}});
           this.setState({textOptions: nextState});
       }
   }

   handleSubmit(e){
        console.log("NewQuestion: handling submit");
        e.preventDefault();
        this.props.QuestionCallbacks.addQuestion(this.state);
        this.props.history.push("/questions");
   }

   handleClose(e){
      this.props.history.push("/");
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
            deleteSelectionOption:this.addSelectionOption.bind(this),
            handleTextOptionChange: this.handleTextOptionChange.bind(this)
   };

      return (
         <QuestionForm draftQuestion={this.state}
                  buttonLabel="Add Question"
                  handleChange={this.handleChange.bind(this)}
                  handleCheckChange = {this.handleCheckChange.bind(this)}
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
