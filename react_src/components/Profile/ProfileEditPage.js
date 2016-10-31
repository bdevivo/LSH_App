import React, {PropTypes} from 'react';
import ProfileEdit from './ProfileEdit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import { browserHistory } from 'react-router';
import AWS from 'aws-sdk';

const update = require('react-addons-update');
const pathParse = require('path-parse');

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
    }

    componentWillReceiveProps(nextProps)
    {
        //console.log("componentWillReceiveProps");
        //debugger;

        if (nextProps.profile !== this.state.profile)
        {
            this.setState({profile: nextProps.profile});
        }
    }

    onProfileUpdated()
    {
        browserHistory.push('/profile');
    }

    handleAvatarChange(event, results) {
        //debugger;
        const [e, file] = results[0];
        const storageKey = "avatarTempData";
        results.forEach(result => {
            const [e] = result;
            localStorage.setItem(storageKey, e.target.result);
        });

        //debugger;
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
        let {user_id, first, middle, last} = profile.user_metadata;

        if (avatarLocalFileName)
        {
            this.props.actions.updateProfileAvatar(user_id, avatarLocalFileName, localAvatarFile);
            //this.uploadAvatarImage();
            localStorage.removeItem('avatarTempData');
        }

        this.props.actions.updateProfileUserName(first, middle, last);
    }

    updateProfileName(event) {
        const field = event.target.name;
        let newProfile = update(this.state.profile,
            {
                user_metadata: {
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

        // listen to profile_updated events to update internal state
        // this.props.auth.on('profile_updated', (newProfile) => {
        //     this.setState({profile: newProfile});
        // });

        const { profile } = this.state;
       // debugger;

        return (
            <div>

                <h3>Edit Profile</h3>
                <ProfileEdit
                    profile={profile}
                    updateProfileAddressField = {this.updateProfileAddressField}
                    updateProfileAddressState={this.updateProfileAddressState}
                    updateProfileName = {this.updateProfileName}
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
    debugger;
    return {
        profile: state.profile
    };
}

function mapDispatchToProps(dispatch)
{
    //debugger;
    return {
        actions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
