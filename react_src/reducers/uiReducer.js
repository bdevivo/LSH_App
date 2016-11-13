import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function uiReducer(ui = initialState.ui, action) {

    switch (action.type) {

        case types.PROFILE_EDIT_MODE_ON: {
            return Object.assign({}, ui, {in_profile_edit_mode: true});
        }

        case types.PROFILE_EDIT_MODE_OFF: {
            return Object.assign({}, ui, {in_profile_edit_mode: false});
        }

        case types.PROFILE_SECTION_ENTERED: {
            return Object.assign({}, ui, {
                profile_section: action.section,
                profile_section_name: action.sectionName
            });
        }

        default:
            return ui;
    }
}