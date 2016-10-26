import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import CSSModules from 'react-css-modules';
import styles, { active } from './Header.css';
import HeaderCenterNav from './HeaderCenterNav';
import HeaderUserName from './HeaderUserName';
import HeaderLogin from './HeaderLogin';
// import LoadingDots from './LoadingDots';

class Header extends React.Component {

    // constructor(props, context) {
    //     super(props, context);
    //     this.state = {
    //         profile: props.auth.getProfile()
    //     };

        // this.onLogin = this.onLogin.bind(this);
        // this.onLogout = this.onLogout.bind(this);

    //}

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

    onProfileUpdated(newProfile)
    {
        this.setState({profile: newProfile});
    }

    onUserLogout()
    {
        console.log("render Header on logout");
        this.setState({profile: {}});
    }

    onLogin()
    {
        this.props.auth.login();
    }

    onLogout()
    {
        this.props.auth.logout();
    }

    isLoggedIn()
    {
        return this.props.auth.loggedIn();
    }

    hasRole(roleName)
    {
        let { profile } = this.state;
        let { app_metadata } = profile || {};
        let { roles } = app_metadata || {};
        if (!roles)
            return false;

        return (roles.indexOf(roleName) != -1);
    }

    render() {

       return (
           <header styleName="nav">

               <nav>
                   <HeaderCenterNav isLoggedIn={} isAdmin={} isBuyer={} />
                   <HeaderUserName user_name={} email={} />
                   <HeaderLogin isLoggedIn={} onLogin={} onLogout={} />
               </nav>

           </header>
       );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile.toJS(),
        isLoggedIn: state.isLoggedIn
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        actions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles));
