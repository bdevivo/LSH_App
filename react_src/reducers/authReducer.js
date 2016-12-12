import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
//import  Immutable from 'immutable';

export default function authReducer(auth = initialState.auth, action) {

    switch (action.type) {

        case types.USER_LOGIN_SUCCESS: {
            return {"isLoggedIn": true};
        }

        case types.USER_LOGOUT: {
            return {"isLoggedIn": false};
        }

        default:
            return auth;
    }
}
