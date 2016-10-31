import React, {PropTypes} from 'react';
import { Link } from 'react-router';
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

        userDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
            <Link to="/profile">{userName}</Link>
        </div>);
    }

    return userDiv;
};

HeaderUserName.propTypes = {
    user_name: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default CSSModules(HeaderUserName, styles);
//export default HeaderUserName;