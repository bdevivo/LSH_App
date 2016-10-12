import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AuthService from './utils/AuthService';

import App from './components/App/App';
import QuestionPage from './components/questions/QuestionPage';
import NavigationPage from './components/navigation/NavigationPage';
import NewQuestion from './components/questions/NewQuestion';
import EditQuestion from './components/questions/EditQuestion';
import QuestionWizardPage from './components/question_wizard/QuestionWizardPage';
import HomePage from './HomePage';
import ProfilePage from './components/profile/ProfilePage';
import Login from './components/Login/LoginPage';

//noinspection JSUnresolvedVariable
//console.log("AUTH0_CLIENT_ID: " + process.env.AUTH0_CLIENT_ID);
const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/login' });
    }
};

export default (
    <Route path="/" component={App} auth={auth}>
        <IndexRoute component={HomePage}/>
        <Route path="questions" component={QuestionPage}>
            <Route path="/new" component={NewQuestion} />
            <Route path="edit/:question_id" component={EditQuestion} />
        </Route>
        <Route path="navigation" component={NavigationPage} />
        <Route path="profile" component={ProfilePage}  onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="questionwizard" component={QuestionWizardPage} />
   </Route>
);
