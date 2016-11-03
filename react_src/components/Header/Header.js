import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import * as authActions from '../../actions/authActions';
import CSSModules from 'react-css-modules';
import styles, {active} from './Header.css';
import HeaderCenterNav from './HeaderCenterNav';
import HeaderUserName from './HeaderUserName';
import HeaderLogin from './HeaderLogin';
import AuthApi from '../../api/authApi';
//import ProfileApi from '../../api/profileApi';
import * as Auth from '../../auth';

// import LoadingDots from './LoadingDots';

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
        //debugger;
        this.state = {
            profile: props.profile,
            isLoggedIn: (props.isLoggedIn && AuthApi.isLoggedIn()),  // add extra check to make sure login has not expired,
            isAdmin: Auth.isAdmin(),
            isBuyer: Auth.isBuyer()

        };

        //console.log("constructor");

        this.onLogin = this.onLogin.bind(this);
        this.onAuthenticated = this.onAuthenticated.bind(this);
        this.onLoggedOut = this.onLoggedOut.bind(this);
        this.onProfileUpdated = this.onProfileUpdated.bind(this);
    }

    componentWillMount()
    {
        Auth.auth.on('profile_updated', this.onProfileUpdated);
        Auth.auth.on('authenticated', this.onAuthenticated);
        Auth.auth.on('user_logout', this.onLoggedOut);
    }

    componentWillReceiveProps(nextProps)
    {
        console.log("componentWillReceiveProps");
        //debugger;

        if (nextProps.isLoggedIn !== this.state.isLoggedIn)
        {
            //console.log("setting isLoggedIn state to: " + nextProps.isLoggedIn);
            this.setState({isLoggedIn: nextProps.isLoggedIn});
        }
        //debugger;
        if (nextProps.profile !== this.state.profile)
        {
            this.setState({profile: nextProps.profile});
        }
    }


    componentWillUnmount()
    {
        Auth.auth.removeListener('profile_updated', this.onProfileUpdated);
        Auth.auth.removeListener('authenticated', this.onAuthenticated);
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
        // dispatch an action to update the state, which will re-render this component.
        // (This is also the third stage in the login sequence.)
        this.props.profileActions.updateProfile(profile);
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
        //console.log("Header: rendering...");

        let {profile, isLoggedIn, isAdmin, isBuyer} = this.state;
        let user_name = profile.user_name || {};
        let email = profile.email || '';
        isLoggedIn = Auth.auth.loggedIn();  isLoggedIn && Auth.auth.loggedIn();

        //debugger;
       // console.log("Header: isLoggedIn = " + isLoggedIn);

        return (
            <header styleName="nav">

                <nav>
                    <HeaderCenterNav isLoggedIn={isLoggedIn} isAdmin={isAdmin} isBuyer={isBuyer}/>
                    <HeaderUserName user_name={user_name} email={email} isLoggedIn={isLoggedIn}/>
                    <HeaderLogin isLoggedIn={isLoggedIn} onLogin={this.onLogin} onLogout={this.onLogout}/>
                </nav>

            </header>
        );
    }
}

Header.propTypes = {
    profile: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    authActions: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    //debugger;
    console.log("mapStateToProps: user_id = " + state.profile.user_id);
    return {
        profile: state.profile,
        isLoggedIn: state.auth.isLoggedIn

        // profile: state.get("profile").toJS(),
        // isLoggedIn: state.get("auth").get("isLoggedIn")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles));
//export default connect(mapStateToProps, mapDispatchToProps)(Header);
