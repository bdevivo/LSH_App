import CustomAuthService from './CustomAuthService';
import {EventEmitter} from 'events';
import * as CONSTANTS from './constants';

const customAuth = new CustomAuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

export const notifier = new EventEmitter();

// re-emit the profile_updated event from the CustomAuthService
customAuth.on('profile_updated', (profile) => {
    notifier.emit('profile_updated', profile);
});

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
    if (!customAuth.isLoggedIn()) {
        console.log(`Not authorized to view route ${nextState}`);
        replace({pathname: '/login'});
    }
};

// OnEnter for callback url to parse access_token
export const onEnterLogin = (nextState, replace) => {
    if (nextState.location.hash) {  // if hash exists, this is the callback from the Auth0 service
        if (customAuth.parseHash(nextState.location.hash))  // hash the id token and add to localstorage
        {
            customAuth.load_profile(customAuth.getToken());     // retrieve profile from Auth0 and add to localstorage
        }
    }
};

export const login = (email, password) => {
    customAuth.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: email,
        password: password
    }, function (err) {
        if (err) alert("something went wrong: " + err.message);
    });
};

export const logout = () => {   // Clear user token and profile data from localStorage
    localStorage.removeItem(CONSTANTS.ID_TOKEN_KEY);
    localStorage.removeItem(CONSTANTS.PROFILE_KEY);
    localStorage.removeItem(CONSTANTS.USER_ID_KEY);
};

export const isLoggedIn = () => {
    return customAuth.isLoggedIn();
};

// TODO: split into Profile (from Auth0) and User_Data (from Mongo)
export const getProfile = () => {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem(CONSTANTS.PROFILE_KEY);
    return profile ? JSON.parse(profile) : {};
};

// TODO: update the profile in Mongo, not in Auth0
export const updateProfile = (data) => {
    //AuthService.updateProfile(data);
};


export const updateProfileUserName = (first, middle, last) => {
    // AuthService.updateProfile({
    //      user_metadata: {
    //          firstName: first,
    //          middleInit: middle,
    //          lastName: last,
    //      }
    //  })
    //      .then(response => response.json())
    //      .then(newProfile => {
    //          return ProfileApi.setProfileAsync(newProfile);
    //      });
};

export const updateProfileAvatar = (avatarUrl) => {
    // return AuthService.updateProfile({
    //     user_metadata: {
    //         profilePicture: avatarUrl
    //     }
    // });
};

export const getUserId = () => {
    //return localStorage.getItem(CONSTANTS.USER_ID_KEY);
    // TODO: store the real _id from Mongo and retrieve here
    return '5830e916b5ef877238c5c1f3';
};

export const isAdmin = () => {
    return customAuth.isAdmin();
};

export const isBuyer = () => {
    return customAuth.hasRole('buyer');
};

export const hasRole = (roleName) => {
    return customAuth.hasRole(roleName);
};


