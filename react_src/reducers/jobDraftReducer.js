import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function jobPostReducer(draftJobPosting = initialState.draftJobPosting, action) {

    switch (action.type) {

        case types.SET_QUESTION_ANSWER: {
            let newAnswers = cloneDeep(action.questionAnswer);
            return update(draftJobPosting,
                {
                    questionAnswers: {
                        [action.questionId]: {$set: newAnswers}
                    }

                });
        }

        case types.SET_QUESTION_ANSWERS: {
            let newQuestionAnswers = draftJobPosting.questionAnswers;
            Object.keys(action.questionAnswers).forEach((key) => {
                let clonedAnswers = cloneDeep(action.questionAnswers[key]);
                newQuestionAnswers = update(newQuestionAnswers, {
                    [key]: {$set: clonedAnswers}
                });
            });

            return update(draftJobPosting,
                {
                    questionAnswers: {$set: newQuestionAnswers}
                });

        }

        case types.CLEAR_QUESTION_ANSWERS: {
            return update(draftJobPosting,
                {
                    questionAnswers: {$set: {}}
                });
        }

        case types.LOAD_QUESTION_ANSWERS_SUCCESS: {
            return action.draftJobPosting;
        }

        default:
            return draftJobPosting;
    }
}
