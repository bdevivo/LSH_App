import AuthService from './AuthService';
import * as profileActions from '../actions/profileActions';
import * as authActions from '../actions/authActions';
import ProfileApi from '../api/profileApi';

// need to export the auth instance so we can use it in non-React modules, like profileApi.  There is probably a better solution than this...
export const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        console.log(`Not authorized to view route ${nextState}`);
        replace({ pathname: '/' });
    }
};


export const updateProfileUserName = (first, middle, last) =>
{
    auth.updateProfile({
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





export const isAdmin = () =>
{
    return auth.isAdmin();
};

export const isBuyer = () =>
{
    return auth.hasRole('buyer');
};

export const hasRole = (roleName) =>
{
    return auth.hasRole(roleName);
};