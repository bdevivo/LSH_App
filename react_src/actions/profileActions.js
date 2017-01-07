import * as types from './actionTypes';
import profileApi from '../api/profileApi';
import userApi from '../api/userApi';

export function setProfile(user) {
    return { type: types.SET_PROFILE, user};
}

export function removeProfile() {
    return { type: types.REMOVE_PROFILE};
}

export function updateProfileAddressSuccess(address) {
    return { type: types.UPDATE_PROFILE_ADDRESS_SUCCESS, address};
}

export function updateProfileAddressFailure() {
    return { type: types.UPDATE_PROFILE_ADDRESS_FAILURE};
}

export function updateProfileEducationSuccess(education) {
    return { type: types.UPDATE_PROFILE_EDUCATION_SUCCESS, education};
}

export function addProfileEducationSuccess(education) {
    return { type: types.ADD_PROFILE_EDUCATION_SUCCESS, education};
}

export function removeProfileEducationSuccess(eduId) {  // TODO: change payload to updated Edu list
    return { type: types.REMOVE_PROFILE_EDUCATION_SUCCESS, eduId};
}

export function updateProfileEmploymentSuccess(employment) {
    return { type: types.UPDATE_PROFILE_EMPLOYMENT_SUCCESS, employment};
}

export function addProfileEmploymentSuccess(employment) {
    return { type: types.ADD_PROFILE_EMPLOYMENT_SUCCESS, employment};
}

export function removeProfileEmploymentSuccess(empId) {  // TODO: change payload to updated Emp list
    return { type: types.REMOVE_PROFILE_EMPLOYMENT_SUCCESS, empId};
}

export function updateProfileSkillsSuccess(skills) {
    return { type: types.UPDATE_PROFILE_SKILLS_SUCCESS, skills};
}


// THUNKS

export function updateProfileAddress(address) {
    return function(dispatch) {
        profileApi.updateProfileAddress(address)
            .then(() => {
                dispatch(updateProfileAddressSuccess(address));
            });
    };
}

export function updateProfileEducation(education) {
    return function(dispatch) {
        profileApi.updateProfileEducation(education)
            .then(education => {
                dispatch(updateProfileEducationSuccess(education));
            });
    };
}

export function addProfileEducation(education) {
    return function(dispatch) {
        profileApi.addProfileEducation(education)
            .then(education => {
                dispatch(addProfileEducationSuccess(education));
            });
    };
}

export function removeProfileEducation(eduId) {
    return function(dispatch) {
        profileApi.removeProfileEducation(eduId)
            .then(eduId => {
                dispatch(removeProfileEducationSuccess(eduId));
            });
    };
}

export function updateProfileEmployment(employment) {
    return function(dispatch) {
        profileApi.updateProfileEmployment(employment)
            .then(employment => {
                dispatch(updateProfileEmploymentSuccess(employment));
            });
    };
}

export function addProfileEmployment(employment) {
    return function(dispatch) {
        profileApi.addProfileEmployment(employment)
            .then(employment => {
                dispatch(addProfileEmploymentSuccess(employment));
            });
    };
}

export function removeProfileEmployment(empId) {
    return function(dispatch) {
        profileApi.removeProfileEmployment(empId)
            .then(empId => {
                dispatch(removeProfileEmploymentSuccess(empId));
            });
    };
}

export function updateProfileSkills(skills) {
    return function(dispatch) {
        profileApi.updateProfileSkills(skills)
            .then(skills => {
                dispatch(updateProfileSkillsSuccess(skills));
            });
    };
}




