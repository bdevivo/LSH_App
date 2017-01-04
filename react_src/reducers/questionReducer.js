import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function questionWizardReducer(questionList = initialState.questions, action) {

    switch (action.type) {


        case types.ADD_QUESTION_SUCCESS: {
            let newQuestionList = questionList.slice();
            newQuestionList.push(action.question);
            return newQuestionList;
        }

        case types.UPDATE_QUESTION_SUCCESS: {
            let questionIndex = questionList.findIndex((x) => x._id == action.question._id);
            if (questionIndex > -1) {
                let newQuestion = cloneDeep(action.question);
                return update(questionList, {$splice: [[questionIndex, 1, newQuestion]]});
            }
            else {
                return questionList;
            }
        }

        case types.REMOVE_QUESTION_SUCCESS: {
            let oldQuestionIndex = questionList.findIndex((x) => x._id == action.questionId);
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
