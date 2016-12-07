import * as types from './actionTypes';
import * as profileActions from './profileActions';
import * as Auth from '../auth_utils/auth';
import {beginAjaxCall} from './ajaxStatusActions';

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

export function login(email, password) {
   return function (dispatch) {
      dispatch(beginAjaxCall());

      Auth.login(email, password);

      //dispatch(loginSuccess(profile));
   };
}

export function onLoginSuccess(profile) {
    return function (dispatch) {
        dispatch(loginSuccess(profile));
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(profileActions.removeProfile());
        dispatch(logoutSuccess());
    };
}

