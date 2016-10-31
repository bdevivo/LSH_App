import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const HeaderLogin = ({isLoggedIn, onLogin, onLogout}) => {

    let loginDiv;

    if (isLoggedIn)
    {
        loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
            <a styleName="link" onClick={onLogout}>Logout</a>
        </div>);
    }
    else
    {
        loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
            <a styleName="link" onClick={onLogin}>Sign In/Sign Up</a>
        </div>);
    }

    return loginDiv;
};

HeaderLogin.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default CSSModules(HeaderLogin, styles);
