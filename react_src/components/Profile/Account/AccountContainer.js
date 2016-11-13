import React, {PropTypes} from 'react';
import ProfileApi from '../../../api/profileApi';
import AccountDetails from './AccountDetails';
import AccountEdit from './AccountEdit';
import update from 'immutability-helper';

class AccountContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            profileActions: props.profileActions,
            avatarTimestamp: new Date().getTime().toString(),
            avatarStorageKey: "",
            avatarLocalFileName: ""
        };

        this.handleAvatarChange = this.handleAvatarChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateProfileName = this.updateProfileName.bind(this);
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

        const {profile, avatarLocalFileName, localAvatarFile} = this.state;
        let {user_id, user_name} = profile;
        let {first, middle, last} = user_name;

        if (avatarLocalFileName) {
            ProfileApi.updateProfileAvatar(user_id, avatarLocalFileName, localAvatarFile);
            localStorage.removeItem('avatarTempData');
        }

        ProfileApi.updateProfileUserName(first, middle, last);
    }

    handleCancel()
    {
        localStorage.removeItem('avatarTempData');
        this.props.profileEditFuncs.exitProfileEditMode();
    }

    handleAvatarChange(event, results) {
        const [e, file] = results[0];
        const storageKey = "avatarTempData";
        results.forEach(result => {
            const [e] = result;
            localStorage.setItem(storageKey, e.target.result);
        });

        this.setState({ // this should trigger the Avatar component to re-render
            avatarTimestamp: new Date().getTime().toString(),
            avatarLocalFileName: file.name,
            localAvatarFile: file
        });
    }

    // Called on every onChange event fired from one of the Name form controls
    updateProfileName(event) {
        const field = event.target.name;
        let newProfile = update(this.state.profile,
            {
                user_name: {
                    [field]: {$set: event.target.value}
                }
            }
        );
        // update the local state
        return this.setState({profile: newProfile});
    }

    render() {

        let {profile} = this.state;

        return (
            <div>
                {this.props.ui.in_profile_edit_mode
                    ? (<AccountEdit
                            profile={profile}
                            updateProfileName={this.updateProfileName}
                            handleSubmit={this.handleSubmit}
                            handleCancel={this.handleCancel}
                            avatarTimestamp={this.state.avatarTimestamp}
                            handleAvatarChange={this.handleAvatarChange}/>)
                    : (<AccountDetails
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
AccountContainer.propTypes = {
    profile: PropTypes.object,
    ui: PropTypes.object,
    profileActions: PropTypes.object,
    uiActions: PropTypes.object,
    profileEditFuncs: PropTypes.object,
    route: PropTypes.object
};


export default AccountContainer;
