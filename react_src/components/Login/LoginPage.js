import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Messages from '../Messages/Messages';
import AuthService from '../../utils/AuthService';
import CSSModules from 'react-css-modules';
import styles from './LoginPage.css';

class Login extends React.Component {


    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin()
    {
        this.props.auth.login();
    }

    render() {

        const { auth } = this.props;

        return (
            <div styleName="root">
                <h2>Login</h2>
                <Messages auth={auth} />
                <ButtonToolbar styleName="toolbar">
                    <Button bsStyle="primary" onClick={this.onLogin()}>Login</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

Login.propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
};

export default CSSModules(Login, styles);
