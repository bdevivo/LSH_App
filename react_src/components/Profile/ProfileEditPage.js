import React, {PropTypes} from 'react';
import ProfileEdit from './ProfileEdit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import {browserHistory} from 'react-router';
import ProfileApi from '../../api/profileApi';
import * as Auth from '../../auth_utils/auth';

const update = require('react-addons-update');

class ProfileEditPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            avatarTimestamp: new Date().getTime().toString(),
            avatarStorageKey: "",
            avatarLocalFileName: "",
            localAvatarFile: {}
        };

        this.updateProfileAddressState = this.updateProfileAddressState.bind(this);
        this.updateProfileAddressField = this.updateProfileAddressField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateProfileName = this.updateProfileName.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
        this.onProfileUpdated = this.onProfileUpdated.bind(this);
    }

    componentWillMount()
    {
        Auth.auth.on('profile_updated', this.onProfileUpdated);
    }

    componentWillUnmount()
    {
        Auth.auth.removeListener('profile_updated', this.onProfileUpdated);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile !== this.state.profile) {
            this.setState({profile: nextProps.profile});
        }
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
            avatarStorageKey: storageKey,
            avatarLocalFileName: file.name,
            localAvatarFile: file
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const {profile, avatarLocalFileName, localAvatarFile} = this.state;
        let {user_id, user_name} = profile;
        let {first, middle, last} = user_name;

        if (avatarLocalFileName) {
            this.props.actions.updateProfileAvatar(user_id, avatarLocalFileName, localAvatarFile);
            //this.uploadAvatarImage();
            localStorage.removeItem('avatarTempData');
        }

        ProfileApi.updateProfileUserName(first, middle, last);
    }

    onProfileUpdated(profile) {
        this.props.actions.updateProfile(profile);
        browserHistory.push('/profile');
    }

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

    // Called when any field except State is updated
    updateProfileAddressField(event) {
        //debugger;
        const field = event.target.name;
        let newProfile = update(this.state.profile,
            {
                user_metadata: {
                    address: {
                        [field]: {$set: event.target.value}
                    }
                }
            }
        );

        // update the local state
        return this.setState({profile: newProfile});
    }

    updateProfileAddressState(event) {
        //debugger;
        let newProfile = update(this.state.profile,
            {
                user_metadata: {
                    address: {
                        'state': {$set: event.value}
                    }
                }
            }
        );

        return this.setState({profile: newProfile});
    }

    render() {
        const {profile} = this.state;
        console.log("ProfileEditPage: first = " + profile.user_name.first);

        return (
            <div>

                <h3>Edit Profile</h3>
                <ProfileEdit
                    profile={profile}
                    updateProfileAddressField={this.updateProfileAddressField}
                    updateProfileAddressState={this.updateProfileAddressState}
                    updateProfileName={this.updateProfileName}
                    handleSubmit={this.handleSubmit}
                    avatarTimestamp={this.state.avatarTimestamp}
                    avatarStorageKey={this.state.avatarStorageKey}
                    handleAvatarChange={this.handleAvatarChange}
                />
            </div>
        );
    }
}

ProfileEditPage.propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
