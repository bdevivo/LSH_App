import * as types from './actionTypes';
import questionPanelApi from '../api/questionPanelApi';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';
import * as uiActions from './uiActions';

export function loadPanelsSuccess(panels) {
    return {type: types.LOAD_QUESTION_PANELS_SUCCESS, panels};
}

export function addPanelSuccess(panel) {
    return {type: types.ADD_QUESTION_PANEL_SUCCESS, panel};
}

export function updatePanelSuccess(panel) {
    return {type: types.UPDATE_QUESTION_PANEL_SUCCESS, panel};
}

export function removePanelSuccess(panelId) {
    return {type: types.REMOVE_QUESTION_PANEL_SUCCESS, panelId};
}

// THUNKS

export function getAllPanels() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return questionPanelApi.getAllPanels()
            .then(response => {
                dispatch(endAjaxCall());
                dispatch(loadPanelsSuccess(response.questionPanels));
            })
            .catch(error => {
                dispatch(endAjaxCall());
                throw(error);   // TODO: add real error handler action
            });
    };
}

export function addPanel(qPanel) {
    return function (dispatch) {
        questionPanelApi.addPanel(qPanel)
            .then(q => {
                dispatch(addPanelSuccess((q)));
                dispatch(uiActions.adminQuestionPanelSelected(q._id));
            });
    };
}

export function updatePanel(qPanel) {
    return function (dispatch) {
        questionPanelApi.updatePanel(qPanel)
            .then(response => {
                dispatch(updatePanelSuccess(qPanel));
            });
    };
}

export function removePanel(panelId, newSelectedPanelId) {
    return function (dispatch) {
        questionPanelApi.deletePanel(panelId)
            .then(response => {
                dispatch(removePanelSuccess(panelId));
                dispatch(uiActions.adminQuestionPanelSelected(newSelectedPanelId));
            });
    };
}

export function panelSelected(panelId) {
    return function (dispatch) {
        dispatch(uiActions.adminQuestionPanelSelected(panelId));
    };
}
