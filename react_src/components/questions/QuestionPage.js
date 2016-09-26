import React, { Component, PropTypes } from 'react';
//import QuestionList from './QuestionList';
import QuestionItem from './QuestionItem';
import { Link } from "react-router";
import update from "react-addons-update";
// Polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

const API_URL = 'http://localhost:3001/api';

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Authorization': 'any-string-you-like'// The Authorization is not needed for local server
};

class QuestionPage extends React.Component {

   constructor(){
      super(...arguments);
      this.state = {
           questions: []
       };
   }

   componentDidMount(){
       let uri = `${API_URL}/questions`;
       //console.log("QuestionPage.componentDidMount fetch URI: " + uri);
      fetch(uri, // template string?
          {
              method: 'get',
              headers:API_HEADERS
          })
          // .then((response) => {
          //     if(response.ok){
          //         console.log("QuestionPage.componentDidMount response is OK.  JSON response: " + response.json());
          //     } else {
          //         throw new Error("Server response for initial question load wasn't OK");
          //     }
          // })
          .then((response) => response.json())
          .then((responseData) => {
             // console.log("QuestionPage.componentDidMount responseData: " + responseData);
             this.setState({
                questions: responseData.questions
             });

             window.state = this.state;
          });
   }

   addQuestion(question) {

       //console.log("QuestionPage.addQuestion: selectionOptions length is: " + question.selectionOptions.length);
       //console.log("QuestionPage.addQuestion: question json: " + JSON.stringify(question));

      // Keep a reference to the original state prior to the mutations
      // in case we need to revert the optimistic changes in the UI
      let prevState = this.state;


      // Add a temporary ID to the question
      if (question.id === null) {
         question = Object.assign({}, question, {id: Date.now()});
      }

      // Create a new object and push the new question to the array of questions
      let nextState = update(this.state.questions, {$push: [question]});

      // set the component state to the mutated object
      this.setState({questions: nextState});

      //Call the API to add the question on the server
      fetch(`${API_URL}/questions`, {
         method: 'post',
         headers: API_HEADERS,
         body: JSON.stringify(question)
      })
      .then((response) => {
            if(response.ok){
               return response.json();
            } else {
               // Throw an error if server response wasn't 'ok'
               // so we can revert back the optimistic changes
               // made to the UI.
               throw new Error("Server response wasn't OK");
            }
         })
        .then((responseData) => {
           // When the server returns the definitive ID
           // used for the new Question on the server, update it on React
           question.id = responseData.id;
           this.setState({questions:nextState});
        })
        .catch((error) => {
            //console.log("Error saving question: " + error);
           this.setState(prevState);
        });
   }

   updateQuestion(question) {
      // Keep a reference to the original state prior to the mutations
      // in case we need to revert the optimistic changes in the UI
      let prevState = this.state;

      // Find the index of the question
      let questionIndex = this.state.questions.findIndex((q)=>q.id == question.id);

      // Using the $set command, we will change the whole question
      let nextState = update(
         this.state.questions, {
            [questionIndex]: {$set: question}
         });
      // set the component state to the mutated object
      this.setState({questions: nextState});

      // Call the API to update the question on the server
      //    fetch('${API_URL}/questions/${question.id}', {
      //       method: 'put',
      //    headers: API_HEADERS,
      //       body: JSON.stringify(question)
      // })
      // .then((response) => {
      //       if(!response.ok){
      //          // Throw an error if server response wasn't 'ok'
      //          // so we can revert back the optimistic changes
      //          // made to the UI.
      //          throw new Error("Server response wasn't OK")
      //       }
      //    })
      //       .catch((error) => {
      //          console.error("Fetch error:",error)
      //          this.setState(prevState);
      //       });
   }

   render() {
      let questionModal = this.props.children && React.cloneElement(this.props.children, {
            //questions: this.state.questions,
            QuestionCallbacks:{
               addQuestion: this.addQuestion.bind(this),
               updateQuestion: this.updateQuestion.bind(this)
            }
         });

      return (
         <div className="app">

            <div className="divQuestions">
               <h1>Questions</h1>

               <ul>
                   {this.state.questions.map(
                    (question) => <QuestionItem key={question.name} name={question.name}/>
                  )}
               </ul>

               <Link to="/new" className="float-button">+</Link>

            </div>

            {questionModal}

         </div>
      );
   }
}


export default QuestionPage;
