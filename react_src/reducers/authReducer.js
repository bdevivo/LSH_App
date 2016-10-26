import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function authReducer(isLoggedIn = initialState.isLoggedIn, action) {

   switch (action.type) {

      case types.USER_LOGIN: {
         return true;   // set isLoggedin to TRUE
      }

      case types.USER_LOGOUT: {
         return false;  // set isLoggedin to FALSE
      }

      default:
         return isLoggedIn;
   }
}
