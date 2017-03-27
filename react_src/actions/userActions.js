import * as types from './actionTypes';
import userApi from '../api/userApi';

export function addUserSuccess(user) {
    return { type: types.ADD_USER_SUCCESS, user};
}

export function updateUserNameSuccess(user_name) {
    return { type: types.UPDATE_USERNAME_SUCCESS, user_name};
}

export function getUserNamesSuccess(userNames) {
    return { type: types.GET_USERNAMES_SUCCESS, userNames};
}

export function updateAvatarSuccess(avatarUrl) {
    return { type: types.UPDATE_AVATAR_SUCCESS, avatarUrl};
}

// THUNKS

export function addUser(profile) {
    return function(dispatch) {
        userApi.addUser(profile)
            .then(user => {
                dispatch(addUserSuccess(user));
            });
    };
}

export function updateUserName(user_id, first, middle, last) {
    return function(dispatch) {
        userApi.updateUserName(user_id, first, middle, last)
            .then(user_name => {
                dispatch(updateUserNameSuccess(user_name));
            });
    };
}

export function getUserNames(userIdList) {
    return function(dispatch) {
        userApi.getUserNames(userIdList)
            .then(userNames => {
                dispatch(getUserNamesSuccess(userNames));
            });
    };
}

export function updateAvatar(user_id, avatarLocalFileName, avatarLocalFile) {
    return function(dispatch) {
        userApi.updateAvatar(user_id,avatarLocalFileName, avatarLocalFile)
            .then(avatarUrl => {
                return userApi.updateAvatarUrl(user_id, avatarUrl);
            })
            .then(avatarUrl => {
                dispatch(updateAvatarSuccess(avatarUrl));
            });
    };
}






