import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import * as authActions from '../../actions/authActions';
import CSSModules from 'react-css-modules';
import styles, {active} from './Header.css';
import HeaderCenterNav from './HeaderCenterNav';
import HeaderUserName from './HeaderUserName';
import HeaderLoginContainer from './HeaderLoginContainer';
import AuthApi from '../../api/authApi';
import * as Auth from '../../auth_utils/auth';
import {Row, Col} from 'react-bootstrap';

// import LoadingDots from './LoadingDots';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
            isLoggedIn: (props.isLoggedIn && AuthApi.isLoggedIn()),  // add extra check to make sure login has not expired,
            isAdmin: Auth.isAdmin(),
            isBuyer: Auth.isBuyer()
        };
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.isLoggedIn && nextProps.isLoggedIn !== this.state.isLoggedIn)
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

    render() {

        let {profile, isLoggedIn, isAdmin, isBuyer} = this.state;
        let user_name = profile.user_name || {};
        let email = profile.email || '';
        //isLoggedIn = isLoggedIn && Auth.auth.loggedIn();
        isLoggedIn = Auth.auth.loggedIn();
        //console.log("Logged in: " + isLoggedIn);

        return (
            <header styleName="nav">
                <nav>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <HeaderCenterNav isLoggedIn={isLoggedIn} isAdmin={isAdmin} isBuyer={isBuyer}/>
                        </Col>
                        <Col md={2}>
                            <HeaderUserName user_name={user_name} email={email} isLoggedIn={isLoggedIn}/>
                        </Col>
                        <Col md={1}>
                            <HeaderLoginContainer isLoggedIn={isLoggedIn} authActions={this.props.authActions} profileActions={this.props.profileActions} />
                        </Col>
                    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Header, styles));
//export default connect(mapStateToProps, mapDispatchToProps)(Header);
