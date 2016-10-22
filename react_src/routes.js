import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AuthService from './utils/AuthService';

import App from './components/App/App';
import QuestionPage from './components/Question/QuestionPage';
import HomePage from './HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import ProfileEditPage from './components/Profile/ProfileEditPage';

//noinspection JSUnresolvedVariable
//console.log("AUTH0_CLIENT_ID: " + process.env.AUTH0_CLIENT_ID);
const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
       console.log(`Not authorized to view route ${nextState}`);
        replace({ pathname: '/' });
    }
};

export default (
    <Route path="/" component={App} auth={auth}>
        <IndexRoute component={HomePage}/>

        <Route path="profile" component={ProfilePage}  onEnter={requireAuth} />
        <Route path="editprofile" component={ProfileEditPage}  onEnter={requireAuth} />

        <Route path="questionwizard" component={QuestionPage} />
   </Route>
);
