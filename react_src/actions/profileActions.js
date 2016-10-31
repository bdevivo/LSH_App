import * as types from './actionTypes';
import profileApi from '../api/profileApi';

export function updateProfileSuccess(profile) {
    return { type: types.UPDATE_PROFILE_SUCCESS, profile};
}

export function removeProfile() {
   //debugger;
   return { type: types.REMOVE_PROFILE};
}

export function getProfile() {
    //debugger;
    const profile = profileApi.getProfile();
    if (profile && Object.keys(profile).length > 0)
        return { type: types.GET_PROFILE_SUCCESS, profile};
    else
        return { type: types.GET_PROFILE_FAILURE};
}



// THUNKS

export function updateProfile(profile) {
    return function(dispatch) {
        dispatch(updateProfileSuccess(profile));
    };
}

export function updateProfileUserName(first, middle, last) {
    return function(dispatch) {
        return profileApi.updateProfileUserName(first, middle, last)
            .then(profile => {
                dispatch(updateProfileSuccess(profile));
            }).catch(error => {
                throw(error);   // TODO: add real error handler action
            });
    };
}

export function updateProfileAvatar(user_id, avatarLocalFileName, avatarLocalFile) {
    return function(dispatch) {
        return profileApi.updateProfileAvatar(user_id, avatarLocalFileName, avatarLocalFile)
            .then(profile => {
                dispatch(updateProfileSuccess(profile));
            }).catch(error => {
                throw(error);   // TODO: add real error handler action
            });
    };
}


