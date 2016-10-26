import {auth} from '../auth';

// This module only exists as a layer of abstraction between the concrete Authorization implementation and
// the rest of the application.

const AuthApi = {

   login() {
         return auth.login();
   },

   logout() {
      return auth.logout();
   },

   isLoggedIn() {
      return auth.loggedIn();
   }

};

export default AuthApi;





