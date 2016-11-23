import * as types from './actionTypes';
import userApi from '../api/userApi';

export function addUserSuccess(user) {
    return { type: types.ADD_USER_SUCCESS, user};
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






