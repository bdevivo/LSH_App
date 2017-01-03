import * as types from './actionTypes';


export function profileSectionEntered(section, sectionName) {
    return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}

export function loginPageEntered(section, sectionName) {
   return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}

export function showAlert(alertProps) {
   return {type: types.SHOW_ALERT, alertProps};
}

export function hideAlert() {
   return {type: types.HIDE_ALERT};
}
