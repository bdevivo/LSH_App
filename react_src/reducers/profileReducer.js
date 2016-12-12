import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

function mapActionToProfile(action) {

    let {profile} = action;
    let {user_metadata} = profile;
    let {address} = user_metadata || {};
    let {app_metadata} = profile;


    // Project data into the correct shape
    return {
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

function mapUserToProfile(user) {

    let {address} = user || {};
    let {app_metadata} = profile;


    // Project data into the correct shape
    return {
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
            return mapActionToProfile(action.profile.user);
        }

        case types.GET_PROFILE_FAILURE: {
            //return "Profile could not be retrieved";
            break;
        }

        case types.REMOVE_PROFILE: {
            //return new Immutable.Map({});  // set empty profile
            return {};
        }

        case types.UPDATE_PROFILE_ADDRESS_SUCCESS: {
            return Object.assign({}, profile, {address: action.address});
        }

        case types.UPDATE_PROFILE_EDUCATION_SUCCESS: {
            let oldEduIndex = profile.education.findIndex((x) => x.id == action.education.id);
            if (oldEduIndex > -1) {
               return update(profile, {education: {$splice: [[oldEduIndex, 1, action.education]]}});
            }
            else {
                return profile;
            }
        }

        case types.ADD_PROFILE_EDUCATION_SUCCESS: {
            let newEduList = profile.education.slice();
            newEduList.push(action.education);
            return Object.assign({}, profile, {education: newEduList});
            //return update(profile, {education: {$push: [action.education]}});
        }

        case types.REMOVE_PROFILE_EDUCATION_SUCCESS: {
            // TODO: change payload to updated edu list, instead of ID to remove
            let oldEduIndex = profile.education.findIndex((x) => x.id == action.eduId);
            if (oldEduIndex > -1) {
                return update(profile, {education: {$splice: [[oldEduIndex, 1]]}});
            }
            else {
                return profile;
            }

        }

        case types.UPDATE_PROFILE_EMPLOYMENT_SUCCESS: {
            let oldEmpIndex = profile.employment.findIndex((x) => x.id == action.employment.id);
            if (oldEmpIndex > -1) {
                return update(profile, {employment: {$splice: [[oldEmpIndex, 1, action.employment]]}});
            }
            else {
                return profile;
            }
        }

        case types.ADD_PROFILE_EMPLOYMENT_SUCCESS: {
            let newEmpList = profile.employment.slice();
            newEmpList.push(action.employment);
            return Object.assign({}, profile, {employment: newEmpList});
            //return update(profile, {employment: {$push: [action.employment]}});
        }

        case types.REMOVE_PROFILE_EMPLOYMENT_SUCCESS: {
            // TODO: change payload to updated emp list, instead of ID to remove
            let oldEmpIndex = profile.employment.findIndex((x) => x.id == action.empId);
            if (oldEmpIndex > -1) {
                return update(profile, {employment: {$splice: [[oldEmpIndex, 1]]}});
            }
            else {
                return profile;
            }

        }

        case types.UPDATE_PROFILE_SKILLS_SUCCESS: {
            return update(profile, {skills: {$set: action.skills}});
        }

        case types.ADD_USER_SUCCESS: {
            return {
                user_id: action.user_id,
                email: action.email
            };
        }

        default:
            return profile;
    }
}
