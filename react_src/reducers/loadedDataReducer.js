import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';
import update from 'immutability-helper';

export default function loadedDataReducer(loadedData = initialState.loadedData, action) {

    switch (action.type) {

        case types.LOAD_QUESTIONS_SUCCESS: {
            return update(loadedData, {questions: {$set: true}});
        }

        case types.LOAD_QUESTION_PANELS_SUCCESS: {
            return update(loadedData, {questionPanels: {$set: true}});
        }

        case types.LOAD_QUESTION_SETS_SUCCESS: {
            return update(loadedData, {questionSets: {$set: true}});
        }

        case types.LOAD_QUESTION_ANSWERS_SUCCESS: {
            return update(loadedData, {questionAnswers: {$set: true}});
        }

        default:
            return loadedData;
    }
}
