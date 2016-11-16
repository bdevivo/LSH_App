import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import HeaderLogin from './HeaderLogin';
import AuthApi from '../../api/authApi';
import * as Auth from '../../auth_utils/auth';

export default class HeaderLoginContainer extends React.Component {

    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);this.onAuthenticated = this.onAuthenticated.bind(this);
        this.onLoggedOut = this.onLoggedOut.bind(this);
        this.onAuthenticated = this.onAuthenticated.bind(this);
        this.onProfileUpdated = this.onProfileUpdated.bind(this);
    }

    componentWillMount()
    {
        Auth.auth.on('authenticated', this.onAuthenticated);
        Auth.auth.on('profile_updated', this.onProfileUpdated);
        Auth.auth.on('user_logout', this.onLoggedOut);
    }

    componentWillUnmount()
    {
        Auth.auth.removeListener('authenticated', this.onAuthenticated);
        Auth.auth.removeListener('profile_updated', this.onProfileUpdated);
        Auth.auth.removeListener('user_logout', this.onLogout);
    }

    onLogin() {
        // Called when user clicks the Login button.  This will show the login widget; if login
        // is successful, eventually onProfileUpdated will be called
        AuthApi.login();
    }

    onAuthenticated(idToken) {
        // Second stage of the login sequence.  Called by the Auth Service when authentication
        // is successful, but before the profile has been loaded.
        this.props.authActions.onLoginSuccess(); // updates the Login state
        AuthApi.load_profile(idToken);
    }

    onProfileUpdated(profile) {
        // Called by the Auth Service whenever the profile is updated; we now need to
        // dispatch an action to update the state.
        // (This is also the third stage in the login sequence.)
        this.props.profileActions.updateProfile(profile);

        // navigate to the home route
        //browserHistory.push('/');
    }

    onLogout() {
        // Called when user clicks the Logout button.
        AuthApi.logout();
    }

    onLoggedOut() {
        // Called by the Auth Service whenever logout is complete.
        this.props.authActions.logout();
    }

    render() {
        return <HeaderLogin isLoggedIn={this.props.isLoggedIn} onLogin={this.onLogin} onLogout={this.onLogout} />;
    }
}

HeaderLoginContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    authActions: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
//     return {
//         isLoggedIn: state.auth.isLoggedIn
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         authActions: bindActionCreators(authActions, dispatch)
//     };
// }

//export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoginContainer);
