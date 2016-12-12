import CustomAuthService from './CustomAuthService';
//import {EventEmitter} from 'events';
import userApi from '../api/userApi';
import * as CONSTANTS from './constants';

const customAuth = new CustomAuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

//export const notifier = new EventEmitter();

// re-emit the profile_updated event from the CustomAuthService
// customAuth.on('profile_updated', (profile) => {
//     notifier.emit('profile_updated', profile);
// });

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
    if (!customAuth.isLoggedIn()) {
        console.log(`Not authorized to view route ${nextState}`);
        replace({pathname: '/login'});
    }
};

// Called when entering the callback URL (see the CustomAuthService constructor) to parse the access_token returned on successful login
// export const onEnterLogin = (nextState, replace) => {
//     if (nextState.location.hash) {  // if hash exists, this is the callback from the Auth0 service (as opposed to the user navigating to this page)
//         if (customAuth.parseHash(nextState.location.hash))  // hash the id token and add to localstorage
//         {
//             customAuth.load_profile(customAuth.getToken());     // retrieve profile from Auth0 and add to localstorage
//         }
//     }
// };

// Called when user clicks the Login button.  On successful login, the callback URL specified in the
// CustomAuthService constructor is called, and the onEnterLogin method above is invoked.
export const login = (email, password) => {

    let params = {
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        popup: false,
        sso: false,
        email: email,
        password: password
    };

    return new Promise((resolve, reject) => {
        customAuth.login(params)
            .then(
                (idToken) => {
                    return customAuth.load_profile(idToken);   // returns a new Promise
                }, (err) => {
                    reject(err);
                })
            .then(
                (auth0_userId) => {
                   return userApi.getUserByAuth0Id(auth0_userId);      // get user info from Mongo -- save what you need in localstorage
                })
            .then((user) => {
                resolve(user);
            });
    });


};


// Just like the login method above, but for initial signup.
export const signup = (email, password, userType) => {

    let accountType = (userType == "work" ? "talent" : "buyer");

    let params = {
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        popup: false,
        sso: false,
        email: email,
        password: password,
        user_metadata: {
            account_type: accountType
        }
    };

    return new Promise((resolve, reject) => {
        customAuth.signup(params)
            .then(
                (idToken) => {
                    return customAuth.load_profile(idToken);   // returns a new Promise
                }, (err) => {
                    reject(err);
                })
            .then(
                (auth0_userId) => {
                    return userApi.addUser(auth0_userId);      // add user info from Mongo -- save what you need in localstorage
                })
            .then(user => resolve(user));
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


