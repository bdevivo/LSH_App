import Auth0 from 'auth0-js';
import {EventEmitter} from 'events';
import {isTokenExpired} from './jwtHelper';
import * as CONSTANTS from './constants';

export default class CustomAuthService extends EventEmitter {

    constructor(clientId, domain) {
        super();

        // Configure Auth0
        this.auth0 = new Auth0({
            clientID: clientId,
            domain: domain,
            //callbackURL:  'http://localhost:3000/login',
            callbackURL: window.location.href,
            responseType: 'token',
        });

        this.signup = this.signup.bind(this);
    }

   signup(params) {
       let auth0 = this.auth0;
       return new Promise(function(resolve, reject) {
           auth0.signup(params, function(err, result) {
               if (err) {
                   reject(err);
               }
               else {
                   resolve(result.idToken);
               }
           });
       });

      //this.auth0.signup(params, this.onSignupComplete);
   }

    login(params) {
       let auth0 = this.auth0;
       return new Promise(function(resolve, reject) {
          auth0.login(params, function(err, result) {
             if (err) {
                reject(err);
             }
             else {
                resolve(result.idToken);
             }
          });
       });
    }



    parseHash(hash) {
        // uses auth0 parseHash method to extract data from url hash
        const authResult = this.auth0.parseHash(hash);
        if (authResult && authResult.idToken) {
            this.setToken(authResult.idToken);
            return true;
        }

        return false;
    }

    isLoggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !isTokenExpired(token);
    }

    isAdmin() {
        let profile = this.getProfile();
        let appMetadata = profile.app_metadata || {};
        let roles = appMetadata.roles || [];
        return (roles.indexOf('admin') != -1);
    }

    hasRole(role) {
        let profile = this.getProfile();
        let appMetadata = profile.app_metadata || {};
        let roles = appMetadata.roles || [];
        return (roles.indexOf(role) != -1);
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem(CONSTANTS.ID_TOKEN_KEY, idToken);
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem(CONSTANTS.ID_TOKEN_KEY);
    }

    load_auth0_user(idToken) {

        return new Promise((resolve, reject) => {
            this.auth0.getProfile(idToken, (error, profile) => {
                if (error) {
                    reject('Error loading the Profile', error);
                } else {
                   // this.setProfile(profile);
                   // resolve(profile.user_id);
                    resolve(profile);
                }
            });
        });
    }

    setProfile(profile) {
        // Save profile data and user_id to localStorage
        let profileString = JSON.stringify(profile);
        localStorage.setItem(CONSTANTS.AUTH0_USER_KEY, profileString);
        localStorage.setItem(CONSTANTS.AUTH0_USER_ID_KEY, profile.user_id);

        //this.emit('profile_updated', profile);
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem(CONSTANTS.AUTH0_USER_KEY);
        return profile ? JSON.parse(profile) : {};
    }
}
