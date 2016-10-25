import {EventEmitter} from 'events';
import {isTokenExpired} from './jwtHelper';
import Auth0Lock from 'auth0-lock';
import {browserHistory} from 'react-router';
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
        console.log("Calling doAuthentication");

        // Saves the user token
        this.setToken(authResult.idToken);

        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
            } else {
                this.setProfile(profile);
                // navigate to the profile route
                browserHistory.push('/profile');
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
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('user_id');

        this.emit('user_logout');

        // navigate to the home route
        browserHistory.push('/');
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // if (!token)
        //     console.log("AuthService.loggedIn(): No token found!");
        // else if (isTokenExpired(token))
        //     console.log("AuthService.loggedIn(): token is expired!");
        // else
        //     console.log("AuthService.loggedIn(): token is VALID");

        return !!token && !isTokenExpired(token);
    }

    validateProfile(profile) {
        console.log("Calling validateProfile");

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

        this.validateProfile(profile);

        // Save profile data and user_id to localStorage
        let jsProfile = JSON.stringify(profile);
        localStorage.setItem('profile', jsProfile);
        localStorage.setItem('user_id', jsProfile.user_id); // redundant; for convenience only

        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile);
    }

    getProfile() {
        console.log("Calling getProfile");

        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }

    updateProfile(data) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken() //setting authorization header
        };

        const body = JSON.stringify(data);
        const userId = localStorage.getItem("user_id");

        // making the PATCH http request to auth0 api, which returns a Promise
        return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
            method: 'PATCH',
            headers: headers,
            body: body
        });
        // .then(response => response.json())
        // .then(newProfile =>
        // {
        //    if (!newProfile.error) {
        //        this.setProfile(newProfile);   //update current local profile
        //       console.log("Updated profile: " + body);
        //    }
        //    else {
        //       console.log(`Error updating profile! error: ${newProfile.error} | error code: ${newProfile.errorCode} | error message: ${newProfile.message}`);
        //    }
        // });
    }

    setToken(idToken) {
        //debugger;
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        //debugger;
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
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
