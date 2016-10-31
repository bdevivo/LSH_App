import * as types from './actionTypes';
import * as profileActions from './profileActions';


//////////////////////////////////////
// ACTIONS
//////////////////////////////////////

export function loginSuccess() {
    return {type: types.USER_LOGIN};
}

export function logoutSuccess() {
    return {type: types.USER_LOGOUT};
}


//////////////////////////////////////
// THUNKS
//////////////////////////////////////

export function onLoginSuccess(profile) {
    //debugger;
    return function (dispatch) {
        console.log("authAction.login: top...");
        //debugger;
        dispatch(loginSuccess(profile));
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(profileActions.removeProfile());
        dispatch(logoutSuccess());
    };
}

