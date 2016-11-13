import React, {PropTypes} from 'react';
import ProfileApi from '../../../api/profileApi';
import AddressDetails from './AddressDetails';
import AddressEdit from './AddressEdit';
import update from 'immutability-helper';

class AddressContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateProfileAddressField = this.updateProfileAddressField.bind(this);
        this.updateProfileAddressState = this.updateProfileAddressState.bind(this);
    }

    componentWillMount()
    {
        let path = this.props.route.path;
        this.props.uiActions.profileSectionEntered(path);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.profile !== this.state.profile)
        {
            this.setState({profile: nextProps.profile});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        ProfileApi.updateProfileAddress(this.state.profile.address);
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

    updateProfileAddressState(event)
    {
        let newProfile = update(this.state.profile,
            {
                address: {
                    'state': {$set: event.value}
                }
            }
        );

        return this.setState({profile: newProfile});
    }

    handleCancel()
    {
        this.props.profileEditFuncs.exitProfileEditMode();
    }

    render() {

        let {profile} = this.state;

        return (
            <div>
                {this.props.ui.in_profile_edit_mode
                    ? (<AddressEdit
                            profile={profile}
                            updateProfileName={this.updateProfileName}
                            handleSubmit={this.handleSubmit}
                            handleCancel={this.handleCancel}
                            updateProfileAddressField={this.updateProfileAddressField}
                            updateProfileAddressState={this.updateProfileAddressState}/>)
                    : (<AddressDetails
                            profile={profile}
                            enterProfileEditMode={this.props.profileEditFuncs.enterProfileEditMode} />)
                }
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
    profileEditFuncs: PropTypes.object,
    route: PropTypes.object
};


export default AddressContainer;
