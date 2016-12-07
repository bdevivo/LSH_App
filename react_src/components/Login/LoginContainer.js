import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import update from 'immutability-helper';
import * as Auth from '../../auth_utils/auth';
import * as profileActions from '../../actions/profileActions';
import * as authActions from '../../actions/authActions';
import Login from './Login';
//import BuyerSignup from './BuyerSignup';
//import TalentSignup from './TalentSignup';

class LoginContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loginType: this.props.params.type,
            email: '',
            pwd: '',
            validationState: {
                email: true,
                pwd: true
            }
        };

        this.updateLoginField = this.updateLoginField.bind(this);
        this.onProfileUpdated = this.onProfileUpdated.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount()
    {
        Auth.notifier.on('profile_updated', this.onProfileUpdated);
    }

    componentWillUnmount()
    {
        Auth.notifier.removeListener('profile_updated', this.onProfileUpdated);
    }

    onProfileUpdated(profile) {
        this.props.profileActions.updateProfile(profile);
        if (Auth.isLoggedIn()) {
            this.props.authActions.onLoginSuccess(); // updates the Login state
        }
        browserHistory.push('/');   // TODO: change to a better landing page
    }

    // Called when any form field is updated
    updateLoginField(event) {
        const field = event.target.name;

        let newState = update(this.state,
            {
                [field]: {$set: event.target.value}
            }
        );

        newState.validationState[field] = (event.target.value.length > 0);

        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        //Auth.login(this.state.email, this.state.pwd);
       this.props.authActions.login(this.state.email, this.state.pwd);
    }



    render()
    {
        let title = (this.state.loginType == "default" ? "Login" : (this.state.loginType == "hire" ? "Sign Up to Hire Resources" : "Sign Up to Find Work"));

       let buttonText = (this.props.loading ? "Loading..." : (this.state.loginType == "default" ? "Login" : "Sign Up"));

        return (
            <Login
                title={title}
                buttonText={buttonText}
                loading={this.props.loading}
                handleSubmit={this.handleSubmit}
                updateLoginField={this.updateLoginField} />
        );
    }
}

LoginContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
   loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
       loading: state.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
