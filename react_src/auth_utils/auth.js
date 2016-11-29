import AuthService from './AuthService';
import ProfileApi from '../api/profileApi';
import CustomAuthService from './CustomAuthService';
import * as CONSTANTS from './constants';

// need to export the auth instance so we can use it in non-React modules, like profileApi.
// TODO: eliminate the need for this by wrapping all AuthService calls in new methods within this module
export const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
    if (!CustomAuthService.isLoggedIn()) {
        console.log(`Not authorized to view route ${nextState}`);
        replace({ pathname: '/' });
    }
};

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
   if (nextState.location.hash) {
      CustomAuthService.parseHash(nextState.location.hash);
      replace({ pathname: '/' });
   }
};


// TODO: just store profile in app state (but what about roles?)
export const getProfile = () =>
{
   // Retrieves the profile data from localStorage
   const profile = localStorage.getItem(CONSTANTS.PROFILE_KEY);
   return profile ? JSON.parse(profile) : {};
};

// TODO: update the profile in Mongo, not in Auth0
export const updateProfile = (data) =>
{
   AuthService.updateProfile(data);
};


export const updateProfileUserName = (first, middle, last) =>
{
   AuthService.updateProfile({
        user_metadata: {
            firstName: first,
            middleInit: middle,
            lastName: last,
        }
    })
        .then(response => response.json())
        .then(newProfile => {
            return ProfileApi.setProfileAsync(newProfile);
        });
};

export const updateProfileAvatar = (avatarUrl) =>
{
    return AuthService.updateProfile({
        user_metadata: {
            profilePicture: avatarUrl
        }
    });
};

export const getUserId = () =>
{
   //return localStorage.getItem(CONSTANTS.USER_ID_KEY);
   // TODO: store the real _id from Mongo and retrieve here
   return '5830e916b5ef877238c5c1f3';
}

export const isAdmin = () =>
{
    return CustomAuthService.isAdmin();
};

export const isBuyer = () =>
{
    return CustomAuthService.hasRole('buyer');
};

export const hasRole = (roleName) =>
{
    return CustomAuthService.hasRole(roleName);
};


