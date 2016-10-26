import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const HeaderUserName = ({user_name, email}) => {

    let userDiv;
    if (this.isLoggedIn())
    {
        let userName = email;    // default

        if (user_name.first)
        {
            userName = `${user_name.first} ${user_name.middle} ${user_name.last}`;
        }

        userDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
            <Link to="/profile">{userName}</Link>
        </div>);
    }

    return {userDiv};
};

HeaderUserName.propTypes = {
    user_name: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired
};

export default CSSModules(HeaderUserName, styles);