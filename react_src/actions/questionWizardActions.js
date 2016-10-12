import * as types from './actionTypes';

export function toggleQuestion(question) {
   return { type: types.TOGGLE_QUESTION, questionID};
}
