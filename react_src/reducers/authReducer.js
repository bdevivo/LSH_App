import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
//import  Immutable from 'immutable';

export default function authReducer(auth = initialState.auth, action) {

    switch (action.type) {

        case types.USER_LOGIN: {
             //console.log("authReducer USER_LOGIN: setting isLoggedIn to TRUE");
            //return new Immutable.Map({"isLoggedIn": true});
            return {"isLoggedIn": true};
        }

        case types.USER_LOGOUT: {
            //return new Immutable.Map({"isLoggedIn": false});
            //console.log("authReducer USER_LOGIN: setting isLoggedIn to FALSE");
            return {"isLoggedIn": false};
        }

        default:
            //console.log("authReducer DEFAULT: setting isLoggedIn to " + auth.isLoggedIn);
            return auth;
    }
}
