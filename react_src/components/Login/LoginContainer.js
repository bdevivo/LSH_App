import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import update from 'immutability-helper';
import * as profileActions from '../../actions/profileActions';
import * as authActions from '../../actions/authActions';
import Login from './Login';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
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

        if (this.state.loginType == "default") {
            this.props.authActions.login(this.state.email, this.state.pwd);
        }
        else {
            this.props.authActions.signup(this.state.email, this.state.pwd, this.state.loginType);
        }
    }

    handleGoogleLogin() {
       this.props.authActions.login_google();
    }


    render()
    {
        return (
            <Login
                loginType={this.state.loginType}
                isLoading={this.props.loading}
                handleSubmit={this.handleSubmit}
                handleGoogleLogin={this.handleGoogleLogin}
                updateLoginField={this.updateLoginField} />
        );
    }
}

LoginContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
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
