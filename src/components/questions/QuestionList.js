import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import QuestionItem from './QuestionItem';

class QuestionList extends Component {

   render() {
      return (
         <div>
            <h1>Questions</h1>
            <ul>
               {this.props.questions.map(
                  (question) => <QuestionItem key={question} title={question}/>
               )}
            </ul>
         </div>

      );
   }




}


export default QuestionList;
