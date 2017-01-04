import * as types from './actionTypes';


export function profileSectionEntered(section, sectionName) {
    return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}

export function loginPageEntered(section, sectionName) {
   return {type: types.PROFILE_SECTION_ENTERED, section, sectionName};
}
