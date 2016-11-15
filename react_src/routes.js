import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import QuestionPage from './components/Question/QuestionPage';
import HomePage from './components/Home/HomePage';
import ProfileContainer from './components/Profile/ProfileContainer';
import AccountContainer from './components/Profile/Account/AccountContainer';
import AddressContainer from './components/Profile/Address/AddressContainer';
import EducationContainer from './components/Profile/Education/EducationContainer';
import SkillsContainer from './components/Profile/Skills/SkillsContainer';
import { auth, requireAuth } from './auth_utils/auth';

//noinspection JSUnresolvedVariable
//console.log("AUTH0_CLIENT_ID: " + process.env.AUTH0_CLIENT_ID);
// need to export the auth instance so we can use it in non-React modules, like profileApi.  There is probably a better solution than this...
//export const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//     if (!auth.loggedIn()) {
//        console.log(`Not authorized to view route ${nextState}`);
//         replace({ pathname: '/' });
//     }
// };

export default (
    <Route path="/" component={App} auth={auth}>
        <IndexRoute component={HomePage}/>
        <Route path="profile" component={ProfileContainer} onEnter={requireAuth}>
            <Route path="account" component={AccountContainer} onEnter={requireAuth} />
            <Route path="address" component={AddressContainer} onEnter={requireAuth} />
            <Route path="education" component={EducationContainer} onEnter={requireAuth} />
            <Route path="skills" component={SkillsContainer} onEnter={requireAuth} />
        </Route>
        <Route path="questionwizard" component={QuestionPage} />
   </Route>
);
