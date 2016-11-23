import * as Auth from '../auth_utils/auth';
//import {EventEmitter} from 'events';
//import * as authActions from '../actions/authActions';
//import * as profileActions from '../actions/profileActions';

// This module only exists as a layer of abstraction between the concrete Authorization implementation and
// the rest of the application.

export default class AuthApi {

    static login() {
        Auth.auth.login();
    }

    // static onAuthenticated(idToken)
    // {
    //     this.props.authActions.onLoginSuccess();   // updates the Login state
    //     AuthApi.load_profile(idToken);  // loads the profile data from Auth0 into local storage
    // }

    static logout() {
        return Auth.auth.logout();
    }

    static isLoggedIn() {
        return Auth.auth.loggedIn();
    }

    static load_profile(idToken) {
        Auth.auth.load_profile(idToken);
    }

    static getUserId() {
        return Auth.auth.getUserId();
    }
}




// Auth.auth.on('authenticated', (idToken) => {
//     // Second stage of the login sequence.  Handle event fired by the Auth Service
//     //  when authentication is successful, but before the profile has been loaded.
//     //authActions.onLoginSuccess();   // updates the Login state
//    // AuthApi.load_profile(idToken);  // loads the profile data from Auth0 into local storage
//     AuthApi.onAuthenticated(idToken);
// });
//
// Auth.auth.on('profile_updated', (profile) => {
//     // Handle event fired by the Auth Service whenever the profile is updated;
//     // we now need to dispatch an action to update the state.
//     // (This is also the third stage in the login sequence.)
//     profileActions.updateProfile(profile);
// });
//
// Auth.auth.on('user_logout', () => {
//     // Called by the Auth Service whenever logout is complete.
//     //authActions.logout();
//     profileActions.removeProfile();
//     authActions.logoutSuccess();
// });








