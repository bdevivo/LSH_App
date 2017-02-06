import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

export default function configureStore(initialState) {

   let store = compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      autoRehydrate()
   )(createStore)(rootReducer);

   const config = {
       blacklist: ['ui', 'loadedData', 'ajaxCallsInProgress', 'questions']
   };

   persistStore(store, config);
   return store;

   // return createStore(
   //     rootReducer,
   //     initialState,
   //     applyMiddleware(thunk, reduxImmutableStateInvariant())
   // );

}
