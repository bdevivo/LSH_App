import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App/App';
import HomePage from './components/Home/HomePage';
import ProfileContainer from './components/Profile/ProfileContainer';
import AccountContainer from './components/Profile/Account/AccountContainer';
import AddressContainer from './components/Profile/Address/AddressContainer';
import EmploymentContainer from './components/Profile/Employment/EmploymentContainer';
import EducationContainer from './components/Profile/Education/EducationContainer';
import SkillsContainer from './components/Profile/Skills/SkillsContainer';
import LoginContainer from './components/Login/LoginContainer';
import LoginCallbackContainer from './components/Login/LoginCallbackContainer';
import AdminContainer from './components/Admin/AdminContainer';
import QuestionListContainer from './components/Admin/Question/QuestionListContainer';
import QuestionPanelListContainer from './components/Admin/QuestionPanel/QuestionPanelListContainer';
import QuestionPanel from './components/Admin/QuestionPanel/QuestionPanelContainer';
import QuestionSetListContainer from './components/Admin/QuestionSet/QuestionSetListContainer';
import QuestionSet from './components/Admin/QuestionSet/QuestionSetContainer';
import PostJob from './components/JobPosting/PostOrEditJob';
import JobDashboard from './components/JobPosting/Dashboard/JobDashboardContainer';
import {requireAuth} from './auth_utils/auth';

//noinspection JSUnresolvedVariable

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="profile" component={ProfileContainer} onEnter={requireAuth}>
            <Route path="account" component={AccountContainer} onEnter={requireAuth}/>
            <Route path="address" component={AddressContainer} onEnter={requireAuth}/>
            <Route path="employment" component={EmploymentContainer} onEnter={requireAuth}/>
            <Route path="education" component={EducationContainer} onEnter={requireAuth}/>
            <Route path="skills" component={SkillsContainer} onEnter={requireAuth}/>
        </Route>
        <Route path="login" component={LoginCallbackContainer}/>
        <Route path="login/:type" component={LoginContainer}/>

        <Route path="admin" component={AdminContainer}>
            <Route path="questionList" component={QuestionListContainer}/>
            <Route path="panels" component={QuestionPanelListContainer}>
               <Route path="panel/:id" component={QuestionPanel} />
            </Route>
            <Route path="qSets" component={QuestionSetListContainer}>
                <Route path="qSet/:id" component={QuestionSet} />
            </Route>
        </Route>

        <Route path="jobdash" component={JobDashboard} />
        <Route path="postjob" component={PostJob}/>
        <Route path="editjob/:jobId" component={PostJob}/>

    </Route>
);
