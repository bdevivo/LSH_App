import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

export default function questionWizardReducer(questionList = initialState.questions, action) {

   switch (action.type) {


       case types.ADD_QUESTION_SUCCESS: {
           let newQuestionList = questionList.slice();
           newQuestionList.push(action.question);
           return newQuestionList;
       }

       case types.UPDATE_QUESTION_SUCCESS: {
           let oldQuestionIndex = questionList.findIndex((x) => x.id == action.question.id);
           if (oldQuestionIndex > -1) {
               return update(questionList, {$splice: [[oldQuestionIndex, 1, action.question]]});
           }
           else {
               return questionList;
           }
       }

       case types.REMOVE_QUESTION_SUCCESS: {
           let oldQuestionIndex = questionList.findIndex((x) => x.id == action.questionId);
           if (oldQuestionIndex > -1) {
               return update(questionList, {$splice: [[oldQuestionIndex, 1]]});
           }
           else {
               return questionList;
           }
       }

       case types.LOAD_QUESTIONS_SUCCESS: {
           return action.questions;
       }


      default:
         return questionList;
   }
}
