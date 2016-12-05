import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const HeaderLogin = ({isLoggedIn, onLogout}) => {

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
            {/*<a styleName="link" onClick={onLogin}>Sign In/Sign Up</a>*/}
            <Link to="/login/default" >Login</Link>
            <Link to="/login/hire" >Sign up to hire resources</Link>
            <Link to="/login/work" >Sign up to find work</Link>
        </div>);
    }

    return loginDiv;
};

HeaderLogin.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default CSSModules(HeaderLogin, styles);
