import React, {PropTypes} from 'react';
import EducationList from './EducationList';
import EducationEdit from './EducationEdit';
import update from 'immutability-helper';

class EducationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            educationRecords: props.profile.education,
            currentEduRecord: {},
            currentEduRecordId: 0,
            validationState: {
                school: true,
                degree: true,
                fromYear: true
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.enterEducationEditMode = this.enterEducationEditMode.bind(this);
        this.updateProfileEducationField = this.updateProfileEducationField.bind(this);
    }

    componentWillMount()
    {   // sets the styling for the left nav
        this.props.uiActions.profileSectionEntered(this.props.route.path, "Education");
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.profile.education !== this.state.educationRecords)
        {
            this.setState({educationRecords: nextProps.profile.education});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        let newValidationState = {};
        let updateObj = {};

        if (this.state.currentEduRecord.school.length == 0)
        {
            updateObj.school = {$set: false};
            isValid = false;
        }
        if (this.state.currentEduRecord.degree.length == 0)
        {
            updateObj.degree = {$set: false};
            isValid = false;
        }
        if (this.state.currentEduRecord.fromYear == 0)
        {
            updateObj.fromYear = {$set: false};
            isValid = false;
        }

        if (isValid) {
            if (this.state.currentEduRecord.id == 0) {
                this.props.profileActions.addProfileEducation(this.state.currentEduRecord);
            }
            else {
                this.props.profileActions.updateProfileEducation(this.state.currentEduRecord);
            }

            this.props.profileEditFuncs.exitProfileEditMode();
        }
        else {
            newValidationState = update(this.state.validationState, updateObj);
            this.setState({validationState: newValidationState});
        }

    }

    // Called when any form field in the EducationEdit component is updated
    updateProfileEducationField(event) {
        const field = event.target.name;

        let newEduRecord = update(this.state.currentEduRecord,
            {
                [field]: {$set: event.target.value}
            }
        );

        let newValidationState = update(this.state.validationState,
            {
                [field]: {$set: (event.target.value.length > 0)}
            }
        );

        this.setState({
            currentEduRecord: newEduRecord,
            validationState: newValidationState
        });
    }

    handleCancel()
    {
        // re-set validation states
        let newValidationState = update(this.state.validationState,
            {
                school: {$set: true},
                degree: {$set: true},
                fromYear: {$set: true}
            });
        this.setState({validationState: newValidationState});

        this.props.profileEditFuncs.exitProfileEditMode();
    }

    enterEducationEditMode(eduId)
    {
        let currentEdu = (eduId > 0   // eduId == 0 is a signal to add a new education record
                        ? this.state.educationRecords.find(edu => edu.id == eduId)
                        : { // create  new, blank record
                            id: 0,
                            school: '',
                            fromYear: 0,
                            toYear: 0,
                            degree: '',
                            fieldsOfStudy: '',
                            description: '',
                            gpa: ''
                        }
        );

        let newState = update(this.state, {
                currentEduRecord: {$set: currentEdu},
                currentEduRecordId: {$set: eduId}
            }
        );

        // let newEduId = update(this.state, {
        //         currentEduRecordId: {$set: eduId}
        //     }
        // );

        this.setState(newState);

        this.props.profileEditFuncs.enterProfileEditMode();
    }

    render() {

       let eduRecords = this.state.educationRecords || [];

        return (
            <div>
                {this.props.ui.in_profile_edit_mode
                    ? (<EducationEdit
                            educationRecord={this.state.currentEduRecord}
                            updateProfileEducationField={this.updateProfileEducationField}
                            handleSubmit={this.handleSubmit}
                            handleCancel={this.handleCancel}
                            validationState={this.state.validationState}
                        />)
                    : (<EducationList
                            educationRecords={eduRecords}
                            enterEducationEditMode={this.enterEducationEditMode}
                        />)
                }
            </div>
        );
    }
}

// Note: we can't make these props Required, because they are passed from the parent element by React.cloneElement,
// and are not seen when this component is created by React.createClass.  See https://github.com/facebook/react/issues/4494#issuecomment-125068868
// In ths future we may want to use Context instead of React.cloneElement, but this feature isn't stable yet (11/11/2016).
EducationContainer.propTypes = {
    profile: PropTypes.object,
    ui: PropTypes.object,
    profileActions: PropTypes.object,
    uiActions: PropTypes.object,
    profileEditFuncs: PropTypes.object,
    route: PropTypes.object
};


export default EducationContainer;
