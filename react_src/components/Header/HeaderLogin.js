import React, {PropTypes} from 'react';
import {Nav} from 'react-bootstrap';
import HeaderLinkButton from './HeaderLinkButton';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const HeaderLogin = ({isLoggedIn, isOnLoginPage, onLogout}) => {

    let login;

    if (isOnLoginPage) {
        login = <span></span>;
    }
    else if (isLoggedIn) {
        login = (
            <div className="hidden-sm hidden-xs" styleName="navLogin">
               <a styleName="link" onClick={onLogout}>Logout</a>
            </div>
        );
    }
    else {
        login = (
         <Nav className="hidden-sm hidden-xs" styleName="navLogin">
            <HeaderLinkButton to="/login/default" type="success">Login</HeaderLinkButton>
            <HeaderLinkButton to="/login/hire" type="primary">Sign up to hire resources</HeaderLinkButton>
            <HeaderLinkButton to="/login/work" type="primary">Sign up to find work</HeaderLinkButton>
         </Nav>);
    }

    return login;


};



HeaderLogin.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isOnLoginPage: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default CSSModules(HeaderLogin, styles);
