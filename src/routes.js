import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import QuestionPage from './components/questions/QuestionPage';
import NavigationPage from './components/navigation/NavigationPage';
import UserPropsPage from './components/userprops/UserPropsPage';
import NewQuestion from './components/questions/NewQuestion';
import EditQuestion from './components/questions/EditQuestion';
//import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

export default (
   <Route path="/" component={App}>
      <Route path="questions" component={QuestionPage}>
         <Route path="/new" component={NewQuestion} />
         <Route path="edit/:question_id" component={EditQuestion} />
      </Route>
      <Route path="navigation" component={NavigationPage} />
      <Route path="userprops" component={UserPropsPage} />
   </Route>
);
