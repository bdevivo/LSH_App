import * as types from './actionTypes';


export function profileSectionEntered(section, sectionName) {
    return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}

export function loginPageEntered(section, sectionName) {
   return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}


export function adminQuestionPanelSelected(panelId) {
    return {type: types.ADMIN_QUESTION_PANEL_SELECTED, panelId};
}

export function adminQuestionSetSelected(qSetId) {
   return {type: types.ADMIN_QUESTION_SET_SELECTED, qSetId};
}

export function setCurrentPanel(panelId, gridName) {
    return {type: types.SET_CURRENT_PANEL, panelId, gridName};
}

export function pushPanelHistory(panelId, gridName) {
    return {type: types.PUSH_PANEL_HISTORY, panelId, gridName};
}

export function popPanelHistory(gridName) {
    return {type: types.POP_PANEL_HISTORY, gridName};
}

export function clearPanelHistory(gridName) {
    return {type: types.CLEAR_PANEL_HISTORY, gridName};
}

export function toggleQuestionAnswerMode(isInMode) {
    return {type: types.TOGGLE_QUESTION_ANSWER_MODE, isInMode};
}

