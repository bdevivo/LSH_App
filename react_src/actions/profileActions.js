import * as types from './actionTypes';
import profileApi from '../api/profileApi';

export function updateProfileSuccess(profile) {
    //debugger;
    return { type: types.UPDATE_PROFILE_SUCCESS, profile};
}

export function getProfile() {
    //debugger;
    const profile = profileApi.getProfile();
    if (profile && Object.keys(profile).length > 0)
        return { type: types.GET_PROFILE_SUCCESS, profile};
    else
        return { type: types.GET_PROFILE_FAILURE};
}

export function loginSuccess() {
    return { type: types.USER_LOGIN };
}

export function logoutSuccess() {
    return { type: types.USER_LOGOUT };
}

// THUNKS

export function updateProfileName(first, middle, last) {
    return function(dispatch) {
        return profileApi.updateProfileName(first, middle, last)
            .then(profile => {
                dispatch(updateProfileSuccess(profile));
            }).catch(error => {
                throw(error);   // TODO: add real error handler action
            });
    };
}

export function login() {
    return function(dispatch) {

    };
}