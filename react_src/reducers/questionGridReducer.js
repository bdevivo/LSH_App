import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

export default function questionGridReducer(questionGrids = initialState.questionGrids, action) {

    switch (action.type) {

        case types.SET_QUESTION_ANSWER: {
            return update(questionGrids,
                {
                    [action.gridName]: {
                        questionAnswers: {
                            [action.questionId]: {$set: action.questionAnswer}
                        }
                    }
                });
        }

        case types.CLEAR_QUESTION_ANSWERS: {
            return update(questionGrids,
                {
                    [action.questionId]: {
                        questionAnswers: {$set: {}}
                    }
                });
        }

        case types.LOAD_QUESTION_ANSWERS_SUCCESS: {
            return action.questionGrids;
        }

        default:
            return questionGrids;
    }
}
