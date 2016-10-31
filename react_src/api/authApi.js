import * as Auth from '../auth';
import {EventEmitter} from 'events';
import * as authActions from '../actions/authActions';

// This module only exists as a layer of abstraction between the concrete Authorization implementation and
// the rest of the application.

export default class AuthApi extends EventEmitter {


    static login() {
        Auth.auth.login();
    }

    static logout() {
        return Auth.auth.logout();
    }

    static isLoggedIn() {
        return Auth.auth.loggedIn();
    }

    static load_profile(idToken) {
        Auth.auth.load_profile(idToken);
    }
}






