import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';
import update from 'immutability-helper';

export default function uiReducer(ui = initialState.ui, action) {

    switch (action.type) {

        case types.PROFILE_SECTION_ENTERED: {
            return Object.assign({}, ui, {
                profile_section: action.section,
                profile_section_name: action.sectionName
            });
        }

        case types.ADMIN_QUESTION_PANEL_SELECTED: {
            return update(ui, {admin_active_panel_id: {$set: action.panelId}});
        }

        default:
            return ui;
    }
}
