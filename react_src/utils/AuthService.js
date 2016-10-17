import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
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

    doAuthentication(authResult){
        // Saves the user token
        this.setToken(authResult.idToken);

        // navigate to the profile route
        browserHistory.push('/profile');

        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
            } else {
                this.setProfile(profile);
            }
        });
    }

    authorizationError(error){
        // Unexpected authentication error
        console.log('Authentication Error', error);
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    logout(){
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        // navigate to the home route
        browserHistory.push('/');
    }

    loggedIn(){
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !isTokenExpired(token);
    }

    setProfile(profile){
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile);
    }

    getProfile(){
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }

   updateProfile(userId, data){
      const headers = {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + this.getToken() //setting authorization header
      };

      // making the PATCH http request to auth0 api
      return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
         method: 'PATCH',
         headers: headers,
         body: JSON.stringify(data)
      })
         .then(response => response.json())
         .then(newProfile => this.setProfile(newProfile)); //updating current local profile
   }

    setToken(idToken){
        //debugger;
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    getToken(){
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

    isAdmin()
    {
        let profile = this.getProfile();
        let appMetadata = profile.app_metadata || {};
        let roles = appMetadata.roles || [];
        return (roles.indexOf('admin') != -1);
    }

    fetch(url, options){
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()){
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
