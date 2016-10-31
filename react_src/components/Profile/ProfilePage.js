import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import ProfileDetails from './ProfileDetails';


class ProfilePage extends React.Component {

    constructor(props, context) {
        super(props, context);
        console.log("Constructing ProfilePage component");
        this.state = {
            profile: props.profile
        };
    }

    render() {

        console.log("ProfilePage: rendering");

        const {profile} = this.state;

        return (
            <div>
                <h3>User Profile</h3>
                <ProfileDetails profile={profile}/>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile

        //profile: state.get("profile").toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
