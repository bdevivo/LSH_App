import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

function mapActionToProfile(action) {

    let {profile} = action;
    let {user_metadata} = profile;
    let {address} = user_metadata || {};
    let {app_metadata} = profile;


    // Project data into the correct shape
    return{
        user_id: profile.user_id,
        email: profile.email,
        user_name: {
            first: user_metadata.firstName,
            middle: user_metadata.middleName,
            last: user_metadata.lastName
        },
        address: {
            street1: address.street1,
            street2: address.street2,
            city: address.city,
            state: address.state,
            country: address.country,
            zip: address.zip
        },
        avatarUrl: user_metadata.profilePicture,
        roles: app_metadata.roles
    };
}

export default function profileReducer(profile = initialState.profile, action) {

    switch (action.type) {

        case types.UPDATE_PROFILE_SUCCESS: {
            //console.log("profile reducer: UPDATE_PROFILE_SUCCESS");
            return mapActionToProfile(action);
        }

        case types.GET_PROFILE_SUCCESS: {
            return mapActionToProfile(action);
        }

        case types.GET_PROFILE_FAILURE: {
            //return "Profile could not be retrieved";
            break;
        }

        case types.REMOVE_PROFILE: {
            //return new Immutable.Map({});  // set empty profile
            return {};
        }

        case types.UPDATE_PROFILE_EDUCATION_SUCCESS: {
            let oldEduIndex = profile.education.findIndex((x) => x.id == action.education.id);
            if (oldEduIndex > -1) {
                //return profile.education.splice(oldEduIndex, 1, action.education);
               let updatedProfile = update(profile,
                  {
                     education: {$splice: [[oldEduIndex, 1, action.education]]}
                  });

               return updatedProfile;
            }
            else {
                return profile;
            }
        }

        case types.ADD_PROFILE_EDUCATION_SUCCESS: {
            let newEduList = profile.education.slice();
            newEduList.push(action.education);
            return Object.assign({}, profile, {education: newEduList});
        }

        default:
            return profile;
    }
}
