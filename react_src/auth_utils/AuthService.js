import {EventEmitter} from 'events';
import {isTokenExpired} from './jwtHelper';
import Auth0Lock from 'auth0-lock';
import {browserHistory} from 'react-router';
import * as CONSTANTS from './constants';
// Polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super();
        this.domain = domain; // setting domain parameter as an instance attribute

        let options = {

            theme: {
                logo: 'https://s3.amazonaws.com/lifescihub/app_images/LSH-justlogo58p.png'
            },
            languageDictionary: {
                title: 'LifeSciHub'
            },
            additionalSignUpFields: [{
                type: 'select',
                name: 'account_type',
                placeholder: 'Account Type',
                options: [
                    {value: 'buyer', label: 'Employer'},
                    {value: 'talent', label: 'Freelancer'}
                ]
            }]
        };

        // Configure Auth0
        this.lock = new Auth0Lock(clientId, domain, options);

        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this.doAuthentication.bind(this));

        // Add callback for lock `authorization_error` event
        this.lock.on('authorization_error', this.authorizationError.bind(this));

        // binds login functions to keep this context
        this.login = this.login.bind(this);
    }

    doAuthentication(authResult) {
        //console.log("Calling doAuthentication");

        // Saves the user token
        this.setToken(authResult.idToken);

        this.emit('authenticated', authResult.idToken);

        // Async loads the user profile data
        // this.lock.getProfile(authResult.idToken, (error, profile) => {
        //     if (error) {
        //         console.log('Error loading the Profile', error);
        //     } else {
        //         this.setProfile(profile);
        //     }
        // });
    }

    load_profile(idToken)
    {
        this.lock.getProfile(idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
            } else {
                this.setProfile(profile);
            }
        });
    }

    authorizationError(error) {
        // Unexpected authentication error
        console.log('Authentication Error', error);
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem(CONSTANTS.ID_TOKEN_KEY);
        localStorage.removeItem(CONSTANTS.PROFILE_KEY);
        localStorage.removeItem(CONSTANTS.USER_ID_KEY);

        this.emit('user_logout');

        // navigate to the home route
        browserHistory.push('/');
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // if (!token)
        //     console.log("AuthService.loggedIn(): No token found!");


        return !!token && !isTokenExpired(token);
    }

    validateProfile(profile) {
        //console.log("Calling validateProfile");

        // make sure all fields are present
        let {user_metadata} = profile;

        user_metadata.firstName = user_metadata.firstName || '';
        user_metadata.lastName = user_metadata.lastName || '';

        user_metadata.address = user_metadata.address || {};
        let {address} = user_metadata;
        address.street1 = address.street1 || '';
        address.street2 = address.street2 || '';
        address.city = address.city || '';
        address.state = address.state || '';
        address.zip = address.zip || '';
        address.country = address.country || '';

    }

    setProfile(profile) {

        //this.validateProfile(profile);

        // Save profile data and user_id to localStorage
        let profileString = JSON.stringify(profile);
        localStorage.setItem(CONSTANTS.PROFILE_KEY, profileString);
        localStorage.setItem(CONSTANTS.USER_ID_KEY,profile.user_id);

        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile);
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem(CONSTANTS.PROFILE_KEY);
        return profile ? JSON.parse(profile) : {};
    }

    updateProfile(data) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken() //setting authorization header
        };

        const body = JSON.stringify(data);
        const userId = localStorage.getItem(CONSTANTS.USER_ID_KEY);

        // make the PATCH http request to Auth0 api, which returns a Promise
        fetch(`https://${this.domain}/api/v2/users/${userId}`, {    // return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
            method: 'PATCH',
            headers: headers,
            body: body
        })
        .then(response => response.json())
        .then(newProfile =>
        {
           if (!newProfile.error) {
               this.setProfile(newProfile);   //update current local profile
              console.log("Updated profile: " + body);
           }
           else {
              console.log(`Error updating profile! error: ${newProfile.error} | error code: ${newProfile.errorCode} | error message: ${newProfile.message}`);
           }
        });
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem(CONSTANTS.ID_TOKEN_KEY, idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem(CONSTANTS.ID_TOKEN_KEY);
    }

    checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
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

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this.checkStatus)
            .then(response => response.json());
    }
}
