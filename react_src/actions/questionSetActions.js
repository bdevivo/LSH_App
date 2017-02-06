import * as types from './actionTypes';
import questionSetApi from '../api/questionSetApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';
import * as uiActions from './uiActions';

export function loadQuestionSetsSuccess(qSets) {
   return {type: types.LOAD_QUESTION_SETS_SUCCESS, qSets};
}

export function addQuestionSetSuccess(qSet) {
   return {type: types.ADD_QUESTION_SET_SUCCESS, qSet};
}

export function updateQuestionSetSuccess(qSet) {
   return {type: types.UPDATE_QUESTION_SET_SUCCESS, qSet};
}

export function removeQuestionSetSuccess(qSetId) {
   return {type: types.REMOVE_QUESTION_SET_SUCCESS, qSetId};
}

// THUNKS

export function getAllQuestionSets() {
   return function (dispatch) {
      dispatch(beginAjaxCall());
      return questionSetApi.getAllQuestionSets()
         .then(response => {
            dispatch(endAjaxCall());
            dispatch(loadQuestionSetsSuccess(response.questionSets));
         })
         .catch(error => {
            dispatch(endAjaxCall());
            throw(error);   // TODO: add real error handler action
         });
   };
}

export function addQuestionSet(qSet) {
   return function (dispatch) {
      questionSetApi.addQuestionSet(qSet)
         .then(q => {
            dispatch(addQuestionSetSuccess((q)));
            dispatch(uiActions.adminQuestionSetSelected(q._id));
         });
   };
}

export function updateQuestionSet(qSet) {
   return function (dispatch) {
      questionSetApi.updateQuestionSet(qSet)
         .then(response => {
            dispatch(updateQuestionSetSuccess(qSet));
         });
   };
}

export function removeQuestionSet(qSetId, newSelectedQuestionSetId) {
   return function (dispatch) {
      questionSetApi.deleteQuestionSet(qSetId)
         .then(response => {
            dispatch(removeQuestionSetSuccess(qSetId));
            dispatch(uiActions.adminQuestionSetSelected(newSelectedQuestionSetId));
         });
   };
}

export function questionSetSelected(qSetId) {
   return function (dispatch) {
      dispatch(uiActions.adminQuestionSetSelected(qSetId));
   };
}
