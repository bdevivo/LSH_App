import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import QuestionItem from './QuestionItem';

class QuestionList extends Component {

   constructor() {
      super(...arguments);
      this.state = {
         questions: ['question uno', 'question dos']
   };

}


   render() {
      return (
         <ul>
            {this.state.questions.map(
               (question) => <QuestionItem key={question} title={question}/>
            )}
         </ul>
      );
   }
}


export default QuestionList;
