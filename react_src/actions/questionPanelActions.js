import * as types from './actionTypes';
import questionPanelApi from '../api/questionPanelApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';

export function loadPanelsSuccess(panels) {
   return { type: types.LOAD_QUESTION_PANELS_SUCCESS, panels};
}

export function addPanelSuccess(panel) {
   return { type: types.ADD_QUESTION_PANEL_SUCCESS, panel};
}

export function updatePanelSuccess(panel) {
   return { type: types.UPDATE_QUESTION_PANEL_SUCCESS, panel};
}

export function removePanelSuccess(panelId) {
   return { type: types.REMOVE_QUESTION_PANEL_SUCCESS, panelId};
}

// THUNKS

export function getAllPanels() {
   return function(dispatch) {
      dispatch(beginAjaxCall());
      return questionPanelApi.getAllQuestionPanels()
         .then(qPanels => {
            dispatch(endAjaxCall());
            dispatch(loadPanelsSuccess(qPanels));
         })
         .catch(error => {
            dispatch(endAjaxCall());
            throw(error);   // TODO: add real error handler action
         });
   };
}

export function addPanel(qPanel) {
   return function(dispatch) {
      questionPanelApi.addPanel(qPanel)
         .then(q => {
            dispatch(addPanelSuccess((q)));
         });
   };
}

export function updatePanel(qPanel) {
   return function(dispatch) {
      questionPanelApi.updatePanel(qPanel)
         .then(response => {
            console.log(response.message);
            dispatch(updatePanelSuccess(qPanel));
         });
   };
}

export function removePanel(panelId) {
   return function(dispatch) {
      questionPanelApi.deletePanel(panelId)
         .then(response => {
            console.log(response.message);
            dispatch(removePanelSuccess(panelId));
         });
   };
}
