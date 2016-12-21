import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import QuestionPage from './components/Question/QuestionPage';
import HomePage from './components/Home/HomePage';
import ProfileContainer from './components/Profile/ProfileContainer';
import AccountContainer from './components/Profile/Account/AccountContainer';
import AddressContainer from './components/Profile/Address/AddressContainer';
import EmploymentContainer from './components/Profile/Employment/EmploymentContainer';
import EducationContainer from './components/Profile/Education/EducationContainer';
import SkillsContainer from './components/Profile/Skills/SkillsContainer';
import LoginContainer from './components/Login/LoginContainer';
import { requireAuth, onEnterLoginCallback } from './auth_utils/auth';

//noinspection JSUnresolvedVariable

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="profile" component={ProfileContainer} onEnter={requireAuth}>
            <Route path="account" component={AccountContainer} onEnter={requireAuth} />
            <Route path="address" component={AddressContainer} onEnter={requireAuth} />
            <Route path="employment" component={EmploymentContainer} onEnter={requireAuth} />
            <Route path="education" component={EducationContainer} onEnter={requireAuth} />
            <Route path="skills" component={SkillsContainer} onEnter={requireAuth} />
        </Route>
       <Route path="login" component={LoginContainer} onEnter={onEnterLoginCallback} />
        <Route path="login/:type" component={LoginContainer} />
        <Route path="questionwizard" component={QuestionPage} />
   </Route>
);
