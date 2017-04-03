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

        case types.ADMIN_QUESTION_SET_SELECTED: {
            return update(ui, {admin_active_qSet_id: {$set: action.qSetId.toString()}});
        }

        case types.SET_CURRENT_PANEL: {
            return update(ui,
                {
                    [action.gridName]: {
                        currentPanelId: {$set: action.panelId}
                    }
                });
        }

        case types.PUSH_PANEL_HISTORY: {
            return update(ui,
                {
                    [action.gridName]: {
                        panelHistory: {$push: [action.panelId]}
                    }
                });
        }

        case types.POP_PANEL_HISTORY: {
            let length = ui[action.gridName].panelHistory.length;
            return update(ui,
                {
                    [action.gridName]: {
                        panelHistory: {$splice: [[length - 1, 1]]}
                    }
                });
        }

        case types.CLEAR_PANEL_HISTORY: {
            return [];
        }

        case types.TOGGLE_QUESTION_ANSWER_MODE: {
            return update(ui,
                {
                    isInQuestionAnswerMode: {$set: action.isInMode}
                });
        }



        default:
            return ui;
    }
}
