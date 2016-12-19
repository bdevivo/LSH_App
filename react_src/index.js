/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './routes';
import {getAllQuestions} from './actions/questionWizardActions';
import initialState from './store/initialState';

const store = configureStore(initialState);
store.dispatch(getAllQuestions());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
   document.getElementById('app')
);


