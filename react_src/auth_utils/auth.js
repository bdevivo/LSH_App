import CustomAuthService from './CustomAuthService';
import * as StringUtils from '../string_utils/UrlHelper';
import userApi from '../api/userApi';
import * as CONSTANTS from './constants';

const customAuth = new CustomAuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
    if (!customAuth.isLoggedIn()) {
        console.log(`Not authorized to view route ${nextState}`);
        replace({pathname: '/login'});
    }
};

//Called when entering the callback URL from a social login to parse the access token returned on successful login
export const onEnterLoginCallback = (locationHash) => {
    if (locationHash) {  // if hash exists, this is the callback from the Auth0 service (as opposed to the user navigating to this page)
        let idToken = customAuth.parseHash(locationHash);
        if (idToken)  // hash the id token
        {
            localStorage.setItem(CONSTANTS.ID_TOKEN_KEY, idToken);
            return new Promise((resolve, reject) => {
                customAuth.load_auth0_user(idToken)   // loads profile from Auth0; returns a Promise
                    .then(
                        (auth0_user) => {
                            let auth0_user_string = JSON.stringify(auth0_user);
                            localStorage.setItem(CONSTANTS.AUTH0_USER_KEY, auth0_user_string);
                            localStorage.setItem(CONSTANTS.AUTH0_USER_ID_KEY, auth0_user.user_id);
                            return userApi.getUserByAuth0Id(auth0_user.user_id);    // loads user info from db
                        })
                    .then(
                        (db_user) => {  // If the user is not already in the db, add a new user and return it.  Otherwise, just return the existing db user.
                            if (db_user.user) {
                                return db_user;
                            }
                            else {
                                // TODO: we need to somehow get the username, email, and login type (social media service) into the db
                                return userApi.addUser(localStorage.getItem(CONSTANTS.AUTH0_USER_ID_KEY));
                            }
                        })
                    .then(
                        (db_user) => {
                            let db_user_info = db_user.user;
                            let dbUserString = JSON.stringify(db_user_info);
                            localStorage.setItem(CONSTANTS.DB_USER_ID_KEY, db_user_info._id);
                            localStorage.setItem(CONSTANTS.DB_USER_KEY, dbUserString);
                            return db_user_info;
                        })
                    .then(
                        (db_user_info) => {
                            let auth0_user_string = localStorage.getItem(CONSTANTS.AUTH0_USER_KEY);
                            let auth0_user = auth0_user_string ? JSON.parse(auth0_user_string) : {};

                            let user = {
                                    user_id: db_user_info._id,
                                    auth0_id: auth0_user.user_id,   // Question: should we use auth0_user.global_client_id instead?
                                    email: auth0_user.email,
                                    roles: auth0_user.app_metadata.roles,
                                    user_name: {
                                        first: auth0_user.given_name,
                                        last: auth0_user.family_name
                                    },
                                };

                            user.avatarUrl = auth0_user.picture || db_user_info.avatarUrl || StringUtils.getDefaultAvatarUrl();

                            resolve(user);
                        }
                    )
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
};


export const login_google = () => {
    customAuth.login_google();
};

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
                    localStorage.setItem(CONSTANTS.ID_TOKEN_KEY, idToken);
                    return customAuth.load_auth0_user(idToken);   // loads profile from Auth0; returns a new Promise
                })
            .then(
                (auth0_user) => {
                    let auth0_user_string = JSON.stringify(auth0_user);
                    localStorage.setItem(CONSTANTS.AUTH0_USER_KEY, auth0_user_string);
                    localStorage.setItem(CONSTANTS.AUTH0_USER_ID_KEY, auth0_user.user_id);
                    return userApi.getUserByAuth0Id(auth0_user.user_id);    // loads user info from db
                })
            .then(
                (db_user) => {
                    let dbUserString = JSON.stringify(db_user);
                    localStorage.setItem(CONSTANTS.DB_USER_ID_KEY, db_user._id);
                    localStorage.setItem(CONSTANTS.DB_USER_KEY, dbUserString);
                    return db_user.user;
                })
            .then(
                (db_user) => {
                    let auth0_user_string = localStorage.getItem(CONSTANTS.AUTH0_USER_KEY);
                    let auth0_user = auth0_user_string ? JSON.parse(auth0_user_string) : {};

                    let user = {
                        user_id: db_user._id,
                        auth0_id: auth0_user.user_id,
                        email: auth0_user.email,
                        roles: auth0_user.app_metadata.roles
                    };

                    if (db_user.name) {
                        user.user_name = {
                            first: db_user.name.first,
                            last: db_user.name.last
                        };
                    }

                    user.avatarUrl = db_user.avatarUrl || StringUtils.getDefaultAvatarUrl();

                    resolve(user);
                }
            )
            .catch((err) => {
                reject(err);
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
                    localStorage.setItem(CONSTANTS.ID_TOKEN_KEY, idToken);
                    return customAuth.load_auth0_user(idToken);   // loads profile from Auth0; returns a new Promise
                })
            .then(
                (auth0_user) => {
                    let auth0_user_string = JSON.stringify(auth0_user);
                    localStorage.setItem(CONSTANTS.AUTH0_USER_KEY, auth0_user_string);
                    localStorage.setItem(CONSTANTS.AUTH0_USER_ID_KEY, auth0_user.user_id);
                    return userApi.addUser(auth0_user.user_id);      // add user to db
                })
            .then(
                (db_user) => {
                    let dbUserString = JSON.stringify(db_user);
                    localStorage.setItem(CONSTANTS.DB_USER_ID_KEY, db_user._id);
                    localStorage.setItem(CONSTANTS.DB_USER_KEY, dbUserString);
                    return db_user;
                })
            .then(
                (db_user) => {
                    let auth0_user_string = localStorage.getItem(CONSTANTS.AUTH0_USER_KEY);
                    let auth0_user = auth0_user_string ? JSON.parse(auth0_user_string) : {};

                    let user = {
                        user_id: db_user._id,
                        auth0_id: auth0_user.user_id,
                        email: auth0_user.email,
                        roles: auth0_user.app_metadata.roles
                    };

                    user.avatarUrl = StringUtils.getDefaultAvatarUrl();
                    resolve(user);
                }
            )
            .catch((err) => {
                reject(err);
            });
    });
};


export const logout = () => {   // Clear user token and profile data from localStorage
    localStorage.removeItem(CONSTANTS.ID_TOKEN_KEY);
    localStorage.removeItem(CONSTANTS.AUTH0_USER_KEY);
    localStorage.removeItem(CONSTANTS.AUTH0_USER_ID_KEY);
};

export const isLoggedIn = () => {
    return customAuth.isLoggedIn();
};




export const getUserId = () => {
    return localStorage.getItem(CONSTANTS.DB_USER_ID_KEY);
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


