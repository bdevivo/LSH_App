import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function questionWizardReducer(questionList = initialState.questions, action) {
   switch (action.type) {
      case types.TOGGLE_QUESTION:
         let questionIndex = questionList.findIndex(x => x.id === action.questionID;
         if (questionIndex > -1)
         {
            let question = questionList.get(questionIndex);
            return questionList.setIn(questionIndex, "visible", !question.visible);
            //return questionList.update(questionIndex, question.set("visible", !question.visible));
         }
         else
            return state;



      default:
         return state;
   }
}
