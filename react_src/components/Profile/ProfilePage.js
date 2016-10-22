import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import AuthService from '../../utils/AuthService';
import ProfileDetails from './ProfileDetails';


class ProfilePage extends React.Component {

    constructor(props, context) {
        super(props, context);
        console.log("Constructing ProfilePage component");
        this.state = {
            profile: props.auth.getProfile()
        };

        this.updateLocalProfile = this.updateLocalProfile.bind(this);
    }

    componentWillMount()
    {
        //listen to profile_updated events to update internal state
        this.props.auth.on('profile_updated', (newProfile) => {
            this.updateLocalProfile(newProfile);
        });
    }

    componentWillUnmount()
    {
        this.props.auth.removeListener('profile_updated', this.updateLocalProfile);
    }

    updateLocalProfile(newProfile) {
        console.log("ProfilePage: updating local profile");
        this.setState({profile: newProfile});
    }

    render() {

        console.log("ProfilePage: rendering");

        const {profile} = this.state;

        return (
            <div>
                <h3>User Profile</h3>
                <ProfileDetails profile={profile} auth={this.props.auth}/>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    auth: PropTypes.instanceOf(AuthService)
};

export default ProfilePage;
