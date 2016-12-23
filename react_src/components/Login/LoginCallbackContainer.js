import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Auth from '../../auth_utils/auth';
import * as authActions from '../../actions/authActions';


class LoginCallbackContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        //this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount ()
    {
        let authActions = this.props.authActions;
        Auth.onEnterLoginCallback(this.props.locationHash)
            .then(
                (user) => {
                    authActions.post_oauth_login(user);
                }
            );
    }

    render()
    {
        return (null);
    }
}

LoginCallbackContainer.propTypes = {
    locationHash: PropTypes.string.isRequired,
    authActions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        locationHash: ownProps.location.hash
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallbackContainer);

