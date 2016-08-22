import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import QuestionPage from './components/questions/QuestionPage';
import NavigationPage from './components/navigation/NavigationPage';
import UserPropsPage from './components/userprops/UserPropsPage';
import NewQuestion from './components/questions/NewQuestion';
import EditQuestion from './components/questions/EditQuestion';
import HomePage from './HomePage';

export default (
   <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="questions" component={QuestionPage}>
         <Route path="/new" component={NewQuestion} />
         <Route path="edit/:question_id" component={EditQuestion} />
      </Route>
      <Route path="navigation" component={NavigationPage} />
      <Route path="userprops" component={UserPropsPage} />
   </Route>
);
