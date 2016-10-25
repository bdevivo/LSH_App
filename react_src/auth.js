import AuthService from './utils/AuthService';

// need to export the auth instance so we can use it in non-React modules, like profileApi.  There is probably a better solution than this...
export const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
export const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        console.log(`Not authorized to view route ${nextState}`);
        replace({ pathname: '/' });
    }
};