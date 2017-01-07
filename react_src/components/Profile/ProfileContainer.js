import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import * as uiActions from '../../actions/uiActions';
import * as userActions from '../../actions/userActions';
import ProfilePage from './ProfilePage';

class ProfileContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            ui: props.ui
        };

        this.onProfileUpdated = this.onProfileUpdated.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    // componentWillMount()
    // {
    //     Auth.auth.on('profile_updated', this.onProfileUpdated);
    // }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.profile !== this.state.profile)
        {
            this.setState({profile: nextProps.profile});
        }
        if (nextProps.ui !== this.state.ui)
        {
            this.setState({ui: nextProps.ui});
        }
    }

    // componentWillUnmount()
    // {
    //     Auth.auth.removeListener('profile_updated', this.onProfileUpdated);
    // }

    onProfileUpdated(profile) {
        this.props.profileActions.updateProfile(profile);
    }

    addUser() {
        this.props.userActions.addUser(this.props.profile);
    }

    render()
    {
        const {profile, ui} = this.state;
        const {profileActions, uiActions, userActions} = this.props;

        return (
            <ProfilePage
                profile={profile}
                profileActions={profileActions}
                addUser={this.addUser}
                ui={ui}
                uiActions={uiActions}
                userActions={userActions}
                children={this.props.children}/>
        );
    }
}

ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    uiActions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        ui: state.ui
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
