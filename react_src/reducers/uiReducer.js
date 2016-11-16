import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function uiReducer(ui = initialState.ui, action) {

    switch (action.type) {

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