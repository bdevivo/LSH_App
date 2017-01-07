import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

function mapUserToProfile(user) {

    let {user_name} = user;

    // Project data into the correct shape
    let profile = {
        user_id: user.user_id,
        auth0_id: user.auth0_id,
        email: user.email,
        avatarUrl: user.avatarUrl,
        roles: user.roles
    };

    if (user_name) {
        profile.user_name = {
                first: user_name.first,
                middle: user_name.middle,
                last: user_name.last,
            };
    }
    else {
        profile.user_name = {};
    }

    profile.user_name.short = user.short_user_name;

    return profile;
}

export default function profileReducer(profile = initialState.profile, action) {

    switch (action.type) {

        case types.SET_PROFILE: {
            return mapUserToProfile(action.user);
        }

        case types.REMOVE_PROFILE: {
            //return new Immutable.Map({});  // set empty profile
            return {};
        }

        case types.UPDATE_USERNAME_SUCCESS: {
            return update(profile, {user_name: {$set: action.user_name}});
        }

        case types.UPDATE_AVATAR_SUCCESS: {
            return update(profile, {avatarUrl: {$set: action.avatarUrl}});
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
