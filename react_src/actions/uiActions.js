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

