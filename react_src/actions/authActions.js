import * as types from './actionTypes';
import AuthApi from '../api/authApi';
import * as profileActions from './profileActions';


export function loginSuccess(profile) {
   return { type: types.USER_LOGIN, profile };
}

export function logoutSuccess() {
   return { type: types.USER_LOGOUT };
}

// THUNKS


export function login() {
   return function (dispatch) {
      return AuthApi.login()
         .then(profile => {
            dispatch(profileActions.updateProfileSuccess(profile));  // because the profile is set on login
            dispatch(loginSuccess(profile));
         }).catch(error => {
            throw(error);   // TODO: add real error handler action
         });
   };
}

export function logout() {
   return function (dispatch) {
      return AuthApi.logout()
         .then(() => {
            dispatch(profileActions.removeProfile());
            dispatch(logoutSuccess());
         }).catch(error => {
            throw(error);   // TODO: add real error handler action
         });
   };
}

