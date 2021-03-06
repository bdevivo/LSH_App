import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';



export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
   if (action.type == types.BEGIN_AJAX_CALL) {
      return state + 1;
   }
   else if (action.type == types.END_AJAX_CALL) {
      return state - 1;
   }

   return state;
}
