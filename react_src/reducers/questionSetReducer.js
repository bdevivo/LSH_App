import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function questionSetReducer(questionSets = initialState.questionSets, action) {

    switch (action.type) {

        case types.ADD_QUESTION_SET_SUCCESS: {
            let newQuestionSetList = questionSets.slice();
            newQuestionSetList.push(action.qSet);
            return newQuestionSetList;
        }

        case types.UPDATE_QUESTION_SET_SUCCESS: {
            let qSetIndex = questionSets.findIndex((x) => x._id == action.qSet._id);
            if (qSetIndex > -1) {
                let newQuestionSet = cloneDeep(action.qSet);
                return update(questionSets, {$splice: [[qSetIndex, 1, newQuestionSet]]});
            }
            else {
                return questionSets;
            }
        }

        case types.REMOVE_QUESTION_SET_SUCCESS: {
            let oldSetIndex = questionSets.findIndex((x) => x._id == action.qSetId);
            if (oldSetIndex > -1) {
                return update(questionSets, {$splice: [[oldSetIndex, 1]]});
            }
            else {
                return questionSets;
            }
        }

        case types.LOAD_QUESTION_SETS_SUCCESS: {
            return action.qSets;
        }

        default:
            return questionSets;
    }
}
