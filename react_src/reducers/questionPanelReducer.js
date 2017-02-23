import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import update from 'immutability-helper';

let cloneDeep = require('lodash/cloneDeep');

export default function questionPanelReducer(questionPanels = initialState.questionPanels, action) {

    switch (action.type) {


        case types.ADD_QUESTION_PANEL_SUCCESS: {
            let newQuestionPanelList = questionPanels.slice();
            newQuestionPanelList.push(action.panel);
            return newQuestionPanelList;
        }

        case types.UPDATE_QUESTION_PANEL_SUCCESS: {
            let panelIndex = questionPanels.findIndex((x) => x._id == action.panel._id);
            if (panelIndex > -1) {
                //let newQuestionPanel = cloneDeep(action.panel);
                return update(questionPanels, {$splice: [[panelIndex, 1, action.panel]]});
            }
            else {
                return questionPanels;
            }
        }

        case types.REMOVE_QUESTION_PANEL_SUCCESS: {
            let oldPanelIndex = questionPanels.findIndex((x) => x._id == action.panelId);
            if (oldPanelIndex > -1) {
                return update(questionPanels, {$splice: [[oldPanelIndex, 1]]});
            }
            else {
                return questionPanels;
            }
        }

        case types.LOAD_QUESTION_PANELS_SUCCESS: {
            return action.panels;
        }


        default:
            return questionPanels;
    }
}
