import * as types from './actionTypes';


export function editProfileOn() {
    return {type: types.PROFILE_EDIT_MODE_ON};
}

export function editProfileOff() {
    return {type: types.PROFILE_EDIT_MODE_OFF};
}

export function profileSectionEntered(section, sectionName) {
    return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}