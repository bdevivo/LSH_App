import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Auth from '../../auth_utils/auth';
import * as profileActions from '../../actions/profileActions';
import * as uiActions from '../../actions/uiActions';
import ProfilePage from './ProfilePage';

class ProfileContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            ui: props.ui
        };

        this.onProfileUpdated = this.onProfileUpdated.bind(this);
        this.enterProfileEditMode = this.enterProfileEditMode.bind(this);
        this.exitProfileEditMode = this.exitProfileEditMode.bind(this);
    }

    componentWillMount()
    {
        Auth.auth.on('profile_updated', this.onProfileUpdated);
        this.exitProfileEditMode();  // always enter in Details mode, not Edit mode
    }

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

    componentWillUnmount()
    {
        Auth.auth.removeListener('profile_updated', this.onProfileUpdated);
        this.exitProfileEditMode();
    }

    onProfileUpdated(profile) {
        this.props.profileActions.updateProfile(profile);
        this.exitProfileEditMode();
    }

    enterProfileEditMode()
    {
        this.props.uiActions.editProfileOn();
    }

    exitProfileEditMode()
    {
        this.props.uiActions.editProfileOff();
    }

    render()
    {
        const {profile, ui} = this.state;
        const {profileActions, uiActions} = this.props;
        const profileEditFuncs = {
            enterProfileEditMode: this.enterProfileEditMode,
            exitProfileEditMode: this.exitProfileEditMode
        };

        return (
            <ProfilePage
                profile={profile}
                profileActions={profileActions}
                ui={ui}
                uiActions={uiActions}
                profileEditFuncs={profileEditFuncs}
                children={this.props.children}/>
        );
    }
}

ProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
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
        uiActions: bindActionCreators(uiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
