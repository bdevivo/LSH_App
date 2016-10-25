import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import  Immutable from 'immutable';

export default function questionWizardReducer(profile = initialState.profile, action) {

    switch (action.type) {

        case types.UPDATE_PROFILE_SUCCESS: {
            return Immutable.fromJS(profile);
        }

        case types.GET_PROFILE_SUCCESS: {
            return Immutable.fromJS(profile);
        }

        case types.GET_PROFILE_FAILURE: {
            return "Profile could not be retrieved";
        }


        default:
            return profile;
    }
}
