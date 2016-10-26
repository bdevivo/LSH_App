import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import * as authActions from '../../actions/authActions';
import CSSModules from 'react-css-modules';
import styles, { active } from './Header.css';
import HeaderCenterNav from './HeaderCenterNav';
import HeaderUserName from './HeaderUserName';
import HeaderLogin from './HeaderLogin';
import AuthApi from '../../api/authApi';

// import LoadingDots from './LoadingDots';

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            isLoggedIn: (props.isLoggedIn && AuthApi.isLoggedIn()),  // add extra check to make sure login has not expired,
            isAdmin: AuthApi.isAdmin(),
            isBuyer: AuthApi.isBuyer()

        };

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);

    }

    // componentWillMount()
    // {
    //     this.props.auth.on('profile_updated', (newProfile) => {
    //         this.onProfileUpdated(newProfile);
    //     });
    //
    //     this.props.auth.on('user_logout', () => {
    //         this.onUserLogout();
    //     });
    // }
    //
    //
    // componentWillUnmount()
    // {
    //     this.props.auth.removeListener('profile_updated', this.onProfileUpdated);
    //     this.props.auth.removeListener('user_logout', this.onUserLogout);
    // }

    // onProfileUpdated(newProfile)
    // {
    //     this.setState({profile: newProfile});
    // }

    // onUserLogout()
    // {
    //     console.log("render Header on logout");
    //     this.setState({profile: {}});
    // }

    onLogin()
    {
        //this.props.auth.login();
       this.props.authActions.login();
    }

    onLogout()
    {
        this.props.authActions.logout();
    }

    render() {

       let { profile, isLoggedIn, isAdmin, isBuyer } = this.state;

       return (
           <header styleName="nav">

               <nav>
                   <HeaderCenterNav isLoggedIn={isLoggedIn} isAdmin={isAdmin} isBuyer={isBuyer} />
                   <HeaderUserName user_name={profile.user_name} email={profile.email} />
                   <HeaderLogin isLoggedIn={isLoggedIn} onLogin={this.onLogin} onLogout={this.onLogout} />
               </nav>

           </header>
       );
    }
}

Header.propTypes = {
   profile: PropTypes.object.isRequired,
   isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile.toJS(),
        isLoggedIn: state.isLoggedIn
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        profileActions: bindActionCreators(profileActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles));
