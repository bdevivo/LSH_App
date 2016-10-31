import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
//import { autoRehydrate } from 'redux-persist-immutable';
import {autoRehydrate} from 'redux-persist';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, reduxImmutableStateInvariant()),
            autoRehydrate()     // re-hydrates the store from localStorage after page refresh
        )
    );

}