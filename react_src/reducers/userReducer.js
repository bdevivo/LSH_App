import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';
import update from 'immutability-helper';

export default function userReducer(userNames = initialState.userNames, action) {

    switch (action.type) {

        case types.GET_USERNAMES_SUCCESS: {
            return action.userNames;
        }

        default:
            return userNames;
    }
}
