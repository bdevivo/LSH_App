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
export const onEnterLoginCallback = (nextState, replace) => {
   if (nextState.location.hash) {  // if hash exists, this is the callback from the Auth0 service (as opposed to the user navigating to this page)
      let idToken = customAuth.parseHash(nextState.location.hash);
      if (idToken)  // hash the id token
      {
         localStorage.setItem(CONSTANTS.ID_TOKEN_KEY, idToken);
         return new Promise((resolve, reject) =>
         {
            customAuth.load_auth0_user(idToken)   // loads profile from Auth0; returns a Promise
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

                     resolve (user);
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
                  return userApi.addUser(auth0_user.user_id);      // add user info from Mongo -- save what you need in localstorage
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

// TODO: split into Profile (from Auth0) and User_Data (from Mongo)
   export const getProfile = () => {
      // Retrieves the profile data from localStorage
      const profile = localStorage.getItem(CONSTANTS.AUTH0_USER_KEY);
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
      //return localStorage.getItem(CONSTANTS.AUTH0_USER_ID_KEY);
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


