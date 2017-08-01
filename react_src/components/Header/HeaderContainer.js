import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as authActions from '../../actions/authActions';
import HeaderCenterNav from './HeaderCenterNav';
import HeaderUserName from './HeaderUserName';
import HeaderLogin from './HeaderLogin';
import Logo from './Logo';
import * as Auth from '../../auth_utils/auth';
import {Nav, Navbar, Image} from 'react-bootstrap';


class HeaderContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
            isLoggedIn: (props.isLoggedIn && Auth.isLoggedIn()),  // add extra check to make sure login has not expired
            isAdmin: Auth.isAdmin(),
            isBuyer: Auth.isBuyer(),
            path: this.props.currentPath
        };

        this.onLogout = this.onLogout.bind(this);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.isLoggedIn !== this.state.isLoggedIn)
        {
            this.setState({isLoggedIn: nextProps.isLoggedIn});
        }

        if (nextProps.profile && nextProps.profile !== this.state.profile)
        {
            this.setState({
                profile: nextProps.profile,
                isAdmin: Auth.isAdmin(),
                isBuyer: Auth.isBuyer()
            });
        }
    }

    onLogout() {
        // Called when user clicks the Logout button.
        Auth.logout();
        this.props.authActions.logout();
        browserHistory.push('/');
    }

    render() {

        // if(this.props.isInQuestionAnswerMode) {
        //     return null;
        // }

        let {profile, isAdmin, isBuyer} = this.state;
        let user_name = profile.user_name || {};
        let email = profile.email || '';
        let isLoggedIn = Auth.isLoggedIn();
        let isOnLoginPage = this.props.currentPath.startsWith("/login");

        return (
            <Navbar>

                <Logo/>

                <HeaderCenterNav isLoggedIn={isLoggedIn} isAdmin={isAdmin} isBuyer={isBuyer}/>

                <HeaderUserName user_name={user_name} email={email} isLoggedIn={isLoggedIn}/>

                <HeaderLogin isLoggedIn={isLoggedIn} isOnLoginPage={isOnLoginPage} onLogout={this.onLogout} />

               {/*{this.props.loading && <LoadingDots interval={100} dots={20}/>}*/}
            </Navbar>

        );
    }
}

HeaderContainer.propTypes = {
    profile: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    authActions: PropTypes.object,
    loading: PropTypes.bool,
    currentPath: PropTypes.string.isRequired,
    isInQuestionAnswerMode: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.ajaxCallsInProgress > 0,
        isInQuestionAnswerMode: state.ui.isInQuestionAnswerMode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
