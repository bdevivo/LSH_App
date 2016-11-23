import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import EmploymentList from './EmploymentList';
import EmploymentEdit from './EmploymentEdit';
import update from 'immutability-helper';

class EmploymentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            employmentRecords: props.profile.employment,
            currentEmploymentRecord: {},
            currentEmploymentRecordId: 0,
            showModal: false,
            validationState: {
                company: true,
                location: true,
                fromMonth: true,
                fromYear: true,
                toMonth: true,
                toYear: true,
                title: true
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.enterEmploymentEditMode = this.enterEmploymentEditMode.bind(this);
        this.updateProfileField = this.updateProfileField.bind(this);
        this.updateProfileCheckboxField = this.updateProfileCheckboxField.bind(this);
        this.removeEmpRecord = this.removeEmpRecord.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {   // sets the styling for the left nav
        this.props.uiActions.profileSectionEntered(this.props.route.path, "Employment");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.employment !== this.state.employmentRecords) {
            this.setState({employmentRecords: nextProps.profile.employment});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        let newValidationState = {};
        let updateObj = {};

        if (this.state.currentEmploymentRecord.company.length == 0) {
            updateObj.company = {$set: false};
            isValid = false;
        }
        if (this.state.currentEmploymentRecord.location.length == 0) {
            updateObj.location = {$set: false};
            isValid = false;
        }
        if (this.state.currentEmploymentRecord.title.length == 0) {
            updateObj.title = {$set: false};
            isValid = false;
        }
        // if (this.state.currentEmploymentRecord.fromMonth == 0) {
        //     updateObj.fromMonth = {$set: false};
        //     isValid = false;
        // }
        if (this.state.currentEmploymentRecord.fromYear == 0) {
            updateObj.fromYear = {$set: false};
            isValid = false;
        }
        // if (this.state.currentEmploymentRecord.toMonth == 0) {
        //     updateObj.toMonth = {$set: false};
        //     isValid = false;
        // }
        if (this.state.currentEmploymentRecord.toYear == 0) {
            updateObj.toYear = {$set: false};
            isValid = false;
        }

        if (isValid) {
            if (this.state.currentEmploymentRecord.id == 0) {
                this.props.profileActions.addProfileEmployment(this.state.currentEmploymentRecord);
            }
            else {
                this.props.profileActions.updateProfileEmployment(this.state.currentEmploymentRecord);
            }

            // TODO: add "updating" intermediate action
            this.closeModal();
        }
        else {
            newValidationState = update(this.state.validationState, updateObj);
            this.setState({validationState: newValidationState});
        }

    }

    // Called when any form field in the EmploymentEdit component (except checkbox) is updated
    updateProfileField(event) {
        const field = event.target.name;

        let newEmpRecord = update(this.state.currentEmploymentRecord,
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
            currentEmploymentRecord: newEmpRecord,
            validationState: newValidationState
        });
    }

    // Called when a Checkbox field in the EmploymentEdit component is updated
    updateProfileCheckboxField(event) {
        const field = event.target.name;

        let newEmpRecord = update(this.state.currentEmploymentRecord,
            {
                [field]: {$set: event.target.checked}
            }
        );

        this.setState({
            currentEmploymentRecord: newEmpRecord
        });
    }

    handleCancel() {
        // re-set validation states
        let newValidationState = update(this.state.validationState,
            {
                company: {$set: true},
                location: {$set: true},
                fromMonth: {$set: true},
                fromYear: {$set: true},
                toMonth: {$set: true},
                toYear: {$set: true},
                title: {$set: true}
            });
        this.setState({validationState: newValidationState});

        this.closeModal();
    }

    enterEmploymentEditMode(empId) {
        let currentEmp = (empId > 0   // empId == 0 is a signal to add a new employment record
                ? this.state.employmentRecords.find(emp => emp.id == empId)
                : { // create  new, blank record
                id: 0,
                company: '',
                location: '',
                title: '',
                fromMonth: 0,
                fromYear: 0,
                toMonth: 0,
                toYear: 0,
                isCurrent: false,
                description: '',
            }
        );

        let newState = update(this.state, {
                currentEmploymentRecord: {$set: currentEmp},
                currentEmploymentRecordId: {$set: empId},
                showModal: {$set: true}
            }
        );

        this.setState(newState);
    }

    closeModal() {
        let newState = update(this.state, {showModal: {$set: false}});
        this.setState(newState);
    }

    removeEmpRecord(empId) {
        this.props.profileActions.removeProfileEmployment(empId);
    }

    render() {

        let empRecords = this.state.employmentRecords || [];

        return (
            <div>
                <EmploymentList
                    employmentRecords={empRecords}
                    enterEmploymentEditMode={this.enterEmploymentEditMode}
                    removeEmpRecord={this.removeEmpRecord}
                />

                <Modal dialogClassName="empModal" show={this.state.showModal} onHide={this.closeModal}>
                    <EmploymentEdit
                        currentEmploymentRecord={this.state.currentEmploymentRecord}
                        updateProfileField={this.updateProfileField}
                        updateProfileCheckboxField={this.updateProfileCheckboxField}
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        handleSubmit={this.handleSubmit}
                        handleCancel={this.handleCancel}
                        validationState={this.state.validationState}
                    />
                </Modal>
            </div>
        );
    }
}

// Note: we can't make these props Required, because they are passed from the parent element by React.cloneElement,
// and are not seen when this component is created by React.createClass.  See https://github.com/facebook/react/issues/4494#issuecomment-125068868
// In ths future we may want to use Context instead of React.cloneElement, but this feature isn't stable yet (11/11/2016).
EmploymentContainer.propTypes = {
    profile: PropTypes.object,
    ui: PropTypes.object,
    profileActions: PropTypes.object,
    uiActions: PropTypes.object,
    route: PropTypes.object
};


export default EmploymentContainer;
