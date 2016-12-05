import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as profileActions from '../../actions/profileActions';
import * as authActions from '../../actions/authActions';
import CSSModules from 'react-css-modules';
import styles, {active} from './Header.css';
import HeaderCenterNav from './HeaderCenterNav';
import HeaderUserName from './HeaderUserName';
import HeaderLogin from './HeaderLogin';
import * as Auth from '../../auth_utils/auth';
import {Row, Col} from 'react-bootstrap';

// import LoadingDots from './LoadingDots';

class HeaderContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
            isLoggedIn: (props.isLoggedIn && Auth.isLoggedIn()),  // add extra check to make sure login has not expired
            isAdmin: Auth.isAdmin(),
            isBuyer: Auth.isBuyer()
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
        //this.props.profileActions.updateProfile(Auth.getProfile());
        this.props.authActions.logout();
        browserHistory.push('/');
    }

    render() {

        let {profile, isAdmin, isBuyer} = this.state;
        let user_name = profile.user_name || {};
        let email = profile.email || '';
        let isLoggedIn = Auth.isLoggedIn();

        return (
            <header styleName="nav">
                <nav>
                    <Row>
                        <Col md={5} mdOffset={2}>
                            <HeaderCenterNav isLoggedIn={isLoggedIn} isAdmin={isAdmin} isBuyer={isBuyer}/>
                        </Col>
                        <Col md={2}>
                            <HeaderUserName user_name={user_name} email={email} isLoggedIn={isLoggedIn}/>
                        </Col>
                        <Col md={2}>
                            <HeaderLogin isLoggedIn={isLoggedIn} onLogout={this.onLogout} />
                        </Col>
                    </Row>
                </nav>

            </header>
        );
    }
}

HeaderContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    authActions: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile,
        isLoggedIn: state.auth.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(HeaderContainer, styles));
//export default connect(mapStateToProps, mapDispatchToProps)(Header);
