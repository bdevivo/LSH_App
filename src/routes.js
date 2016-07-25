import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import QuestionPage from './components/questions/QuestionPage';
import NavigationPage from './components/navigation/NavigationPage';
import UserPropsPage from './components/userprops/UserPropsPage';
//import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

export default (
   <Route path="/" component={App}>
      <IndexRoute component={QuestionPage} />
      <Route path="navigation" component={NavigationPage} />
      <Route path="userprops" component={UserPropsPage} />
   </Route>
);
