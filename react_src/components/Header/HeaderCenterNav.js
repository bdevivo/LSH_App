import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import CSSModules from 'react-css-modules';
import styles, { active } from './Header.css';

const HeaderCenterNav = ({isLoggedIn, isAdmin, isBuyer}) => {

    let centerNav;

    if (isLoggedIn)
    {
        let rootNav;
        let adminNav;
        if (isAdmin) {
            adminNav = (
                <span>
                    <Link to="/admin" >Admin</Link>
                    {" | "}
                    </span>
            );
            // admin users get all center nav links
            rootNav = (
                <span>
                    <Link to="/questionwizard" >Post a Job</Link>
                    {" | "}
                    <Link to="/questionwizard" >Browse Jobs</Link>
                    {" | "}
                    <Link to="/questionwizard" >Browse Talent</Link>
                    </span>

            );
        }
        else {
            if (isBuyer)
            {
                rootNav = (
                    <span>
                            <Link to="/questionwizard" >Post a Job</Link>
                        {" | "}
                        <Link to="/questionwizard" >Browse Talent</Link>
                        </span>
                );
            }
            else    // assumption: only other role is Talent
            {
                rootNav = (
                    <Link to="/questionwizard" >Browse Jobs</Link>
                );
            }
        }

        centerNav = (
            <span>
                {adminNav}
                {rootNav}
            </span>
        );

    }
    else // not logged in
    {
        centerNav = (
            <span>
                <Link to="/dummy" >Browse Talent (not logged in)</Link>
                {" | "}
                <Link to="/dummy" >Learn More</Link>
            </span>
        );
    }

//debugger;
    return centerNav;
};

HeaderCenterNav.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isBuyer: PropTypes.bool.isRequired
};

//export default CSSModules(HeaderCenterNav, styles);
export default HeaderCenterNav;
