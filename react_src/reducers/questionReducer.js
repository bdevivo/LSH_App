import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

//let cloneDeep = require('lodash.clonedeep');
let _ = require('lodash');

export default function questionWizardReducer(questionList = initialState.questions, action) {

    switch (action.type) {


        case types.ADD_QUESTION_SUCCESS: {
            let newQuestionList = questionList.slice();
            newQuestionList.push(action.question);
            return newQuestionList;
        }

        case types.UPDATE_QUESTION_SUCCESS: {
            let questionIndex = questionList.findIndex((x) => x._id === action.question._id);
            if (questionIndex > -1) {
                let newQuestion = _.cloneDeep(action.question);
                return update(questionList, {$splice: [[questionIndex, 1, newQuestion]]});
            }
            else {
                return questionList;
            }
        }

        case types.REORDER_QUESTION_SUCCESS: {
            // This is a little messy, because we have to update the index numbers and then re-sort the list. We
            // might be able to do this using update, but I'm using cloneDeep to make the code a little simpler.
            let newQuestionList = [];
            action.orderedQuestions.forEach(keyPair => {
                let questionIndex = questionList.findIndex(x => x._id === keyPair.qId);
                if (questionIndex > -1) {
                    let newQuestion = _.cloneDeep(questionList[questionIndex]);
                    newQuestion.index = keyPair.index;
                    newQuestionList.push(newQuestion);
                }
            });

            return newQuestionList.sort((a, b) => { return a.index - b.index; });
        }

        case types.REMOVE_QUESTION_SUCCESS: {
            let oldQuestionIndex = questionList.findIndex((x) => x._id === action.questionId);
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
