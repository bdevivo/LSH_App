import React, {PropTypes} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import HeaderLink from './HeaderLink';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const HeaderUserName = ({user_name, email, isLoggedIn}) => {

    let userDiv = null;
    if (isLoggedIn)
    {
        let userName = email;    // default

        if (user_name && user_name.first)
        {
            userName = `${user_name.first} ${user_name.last}`;
        }

        userDiv = (
        <HeaderLink to="/profile/account" key="postJob" className="navItem">{userName}</HeaderLink>
            // <Nav className="hidden-sm hidden-xs" styleName="navUserName">
            //     <NavItem><Link to="/profile/account">{userName}</Link></NavItem>
            // </Nav>
        );
    }

    return (<Nav styleName="navUserName">{userDiv}</Nav>);
};

HeaderUserName.propTypes = {
    user_name: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default CSSModules(HeaderUserName, styles);
