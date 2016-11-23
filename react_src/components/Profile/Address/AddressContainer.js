import React, {PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
//import ProfileApi from '../../../api/profileApi';
import AddressDetails from './AddressDetails';
import AddressEdit from './AddressEdit';
import update from 'immutability-helper';

class AddressContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            showModal: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateProfileAddressField = this.updateProfileAddressField.bind(this);
        this.updateProfileAddressState = this.updateProfileAddressState.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.enterAddressEditMode = this.enterAddressEditMode.bind(this);
    }

    componentWillMount() {
        let path = this.props.route.path;
        this.props.uiActions.profileSectionEntered(path);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile !== this.state.profile) {
            this.setState({profile: nextProps.profile});
        }
    }

    // Called when any field except State is updated
    updateProfileAddressField(event) {
        const field = event.target.name;
        let newProfile = update(this.state.profile,
            {
                address: {
                    [field]: {$set: event.target.value}
                }
            }
        );

        return this.setState({profile: newProfile});
    }

    updateProfileAddressState(event) {
        let newProfile = update(this.state.profile,
            {
                address: {
                    'state': {$set: event.value}
                }
            }
        );

        return this.setState({profile: newProfile});
    }

    enterAddressEditMode()
    {
        let newState = update(this.state, {
                showModal: {$set: true}});

        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        //ProfileApi.updateProfileAddress(this.state.profile.address);
        this.props.profileActions.updateProfileAddress(this.state.profile.address);
        this.closeModal();
    }

    handleCancel() {
        this.closeModal();
    }

    closeModal() {
        let newState = update(this.state, {
            showModal: {$set: false}
        });
        this.setState(newState);
    }

    render() {

        let {profile} = this.state;

        return (
            <div>

                <AddressDetails
                    profile={profile}
                    enterAddressEditMode={this.enterAddressEditMode}/>

                <Modal dialogClassName="eduModal" show={this.state.showModal} onHide={this.closeModal}>
                    <AddressEdit
                        profile={profile}
                        updateProfileName={this.updateProfileName}
                        handleSubmit={this.handleSubmit}
                        handleCancel={this.handleCancel}
                        updateProfileAddressField={this.updateProfileAddressField}
                        updateProfileAddressState={this.updateProfileAddressState}/>
                </Modal>

            </div>
        );
    }
}

// Note: we can't make these props Required, because they are passed from the parent element by React.cloneElement,
// and are not seen when this component is created by React.createClass.  See https://github.com/facebook/react/issues/4494#issuecomment-125068868
// In ths future we may want to use Context instead of React.cloneElement, but this feature isn't stable yet (11/11/2016).
AddressContainer.propTypes = {
    profile: PropTypes.object,
    ui: PropTypes.object,
    profileActions: PropTypes.object,
    uiActions: PropTypes.object,
    route: PropTypes.object
};


export default AddressContainer;
