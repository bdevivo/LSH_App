import React from 'react';
//import QuestionList from './QuestionList';
import QuestionItem from './QuestionItem';
import { Link } from "react-router";
import update from "react-addons-update";

class QuestionPage extends React.Component {

   constructor(){
      super(...arguments);
      this.state = {
         //currentId: 1,
         questions: [
            {
               name: "q1",
               text: "Question 1",
               answerType: "selection"
            },
            {
               name: "q2",
               text: "Question 2",
               answerType: "selection"
            },
            {
               name: "q3",
               text: "Question 3",
               answerType: "selection"
            }
         ]
      };
   }

   addQuestion(question) {
      // Keep a reference to the original state prior to the mutations
      // in case we need to revert the optimistic changes in the UI
      let prevState = this.state;

      // Add a temporary ID to the question
      if (question.id === null) {
         let question = Object.assign({}, question, {id: Date.now()});
      }

      // Create a new object and push the new question to the array of questions
      let nextState = update(this.state.questions, {$push: [question]});

      // set the component state to the mutated object
      this.setState({questions: nextState});

      // Call the API to add the question on the server
      // fetch(`${API_URL}/questions`, {
      //    method: ’post’,
      // headers: API_HEADERS,
      //    body: JSON.stringify(question)
      // })
      // .then((response) => {
      //       if(response.ok){
      //          return response.json()
      //       } else {
      //          // Throw an error if server response wasn’t ’ok’
      //          // so we can revert back the optimistic changes
      //          // made to the UI.
      //          throw new Error("Server response wasn’t OK")
      //       }
      //    })
      //       .then((responseData) => {
      //          // When the server returns the definitive ID
      //          // used for the new Question on the server, update it on React
      //          question.id=responseData.id
      //          this.setState({questions:nextState});
      //       })
      //       .catch((error) => {
      //          this.setState(prevState);
      //       });
      // }

      // question.id = this.state.currentId;
      // this.setState({currentId: this.state.currentId + 1});
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
      //    fetch(`${API_URL}/questions/${question.id}`, {
      //       method: ’put’,
      //    headers: API_HEADERS,
      //       body: JSON.stringify(question)
      // })
      // .then((response) => {
      //       if(!response.ok){
      //          // Throw an error if server response wasn’t ’ok’
      //          // so we can revert back the optimistic changes
      //          // made to the UI.
      //          throw new Error("Server response wasn’t OK")
      //       }
      //    })
      //       .catch((error) => {
      //          console.error("Fetch error:",error)
      //          this.setState(prevState);
      //       });
   }

   render() {
      let questionModal = this.props.children && React.cloneElement(this.props.children, {
            questions: this.state.questions,
            questionCallbacks:{
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
                     (question) => <QuestionItem key={question.name} name={question.text}/>
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
