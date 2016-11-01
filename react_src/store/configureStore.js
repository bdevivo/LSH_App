import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
//import { autoRehydrate } from 'redux-persist-immutable';
import {persistStore, autoRehydrate} from 'redux-persist';

export default function configureStore(initialState) {
   console.log("Creating new store...");


   let store = compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      autoRehydrate()
   )(createStore)(rootReducer);

   persistStore(store);
   return store;



    // let store = createStore(
    //     rootReducer,
    //     initialState,
    //     compose(
    //         applyMiddleware(thunk, reduxImmutableStateInvariant()),
    //         autoRehydrate()     // re-hydrates the store from localStorage after page refresh
    //     )
    // );

}
