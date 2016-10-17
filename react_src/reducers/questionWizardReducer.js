import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function questionWizardReducer(questionList = initialState.questions, action) {
   // let questionList = state.get("questions");
    //debugger;

   switch (action.type) {

      case types.TOGGLE_QUESTION: {
          let questionIndex = questionList.findIndex(function(q){return q.get('id') === action.questionID;});

          if (questionIndex > -1) {
              let question = questionList.get(questionIndex);
              return questionList.setIn([questionIndex, "visible"], !(question.get("visible")));
              //return questionList.update(questionIndex, question.set("visible", !question.visible));
          }
          else
              return questionList;
      }

       case types.LOAD_QUESTIONS_SUCCESS: {
           return action.questions;
       }


      default:
         return questionList;
   }
}
