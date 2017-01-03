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

       case types.SHOW_ALERT: {
          return Object.assign({}, ui, {
             alertProps: {...action.alertProps}
          });
       }

       case types.HIDE_ALERT: {
          return Object.assign({}, ui, {
             alertProps: {
                header: "",
                message: "",
                okButtonText: "",
                className: "",
                visible: false
             }
          });
       }

        default:
            return ui;
    }
}
