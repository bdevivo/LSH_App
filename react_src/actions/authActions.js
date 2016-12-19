import * as types from './actionTypes';
import * as profileActions from './profileActions';
import * as Auth from '../auth_utils/auth';
import {beginAjaxCall, endAjaxCall} from './ajaxStatusActions';
import {browserHistory} from 'react-router';

//////////////////////////////////////
// ACTIONS
//////////////////////////////////////

export function loginSuccess() {
    return {type: types.USER_LOGIN_SUCCESS};
}

export function loginFailure() {
    return {type: types.USER_LOGIN_FAILURE};
}

export function logoutSuccess() {
    return {type: types.USER_LOGOUT_SUCCESS};
}


//////////////////////////////////////
// THUNKS
//////////////////////////////////////

export function login(email, password) {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        Auth.login(email, password)
            .then(
                (user) => {
                    dispatch(loginSuccess());
                    dispatch(profileActions.setProfile(user));
                    dispatch(endAjaxCall());
                    // TODO: re-direct to a dashboard page instead of to home
                    browserHistory.push('/');
                }
            )
            .catch(
                (err) => {
                    dispatch(endAjaxCall());
                    dispatch(loginFailure(err));
                }
            );
    };
}

export function signup(email, password, userType) {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        Auth.signup(email, password, userType)
            .then(
                (user) => {
                    dispatch(loginSuccess());
                    dispatch(profileActions.setProfile(user));
                    dispatch(endAjaxCall());
                    // TODO: re-direct to a dashboard page instead of to home
                    browserHistory.push('/profile/account');
                }
            )
            .catch(
                (err) => {
                    dispatch(endAjaxCall());
                    dispatch(loginFailure(err));
                }
            );
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(profileActions.removeProfile());
        dispatch(logoutSuccess());
    };
}

