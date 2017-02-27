import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function questionGridReducer(questionGrids = initialState.questionGrids, action) {

    switch (action.type) {

        case types.SET_QUESTION_ANSWER: {
            let newAnswers = cloneDeep(action.questionAnswer);
            return update(questionGrids,
                {
                    [action.gridName]: {
                        questionAnswers: {
                            [action.questionId]: {$set: newAnswers}
                        }
                    }
                });
        }

        case types.SET_QUESTION_ANSWERS: {
            let newQuestionGrid = questionGrids[action.gridName];
            Object.keys(action.questionAnswers).forEach((key) => {
                let clonedAnswers = cloneDeep(action.questionAnswers[key]);
                newQuestionGrid = update(newQuestionGrid, {
                    questionAnswers: {
                        [key]: {$set: clonedAnswers}
                    }
                });
            });

            return update(questionGrids,
                {
                    [action.gridName]: {$set: newQuestionGrid}
                });

            // return update(questionGrids,
            //     {
            //         [action.gridName]: {
            //             questionAnswers: {
            //                 [action.questionId]: {$set: newAnswers}
            //             }
            //         }
            //     });

            //return questionGrids;
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
