import React, {PropTypes} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import HeaderLink from './HeaderLink';
import CSSModules from 'react-css-modules';
import styles, {active} from './Header.css';

const HeaderCenterNav = ({isLoggedIn, isAdmin, isBuyer}) => {

    let centerNav;

    if (isLoggedIn) {

        let rootNavItems = [];
        let adminNavItems = [];


        if (isAdmin) {

            adminNavItems = [
                <HeaderLink to="/admin" key="admin" className="navItemWithSep">Admin</HeaderLink>,
            ];

            // admin users get all center nav links
            rootNavItems = [
                <HeaderLink to="/qform" key="postJob" className="navItemWithSep">Post a Job</HeaderLink>,
                <HeaderLink to="/browseJobs" key="browseJobs" className="navItemWithSep">Browse Jobs</HeaderLink>,
                <HeaderLink to="/browseTalent" key="browseTalent" className="navItem">Browse Talent</HeaderLink>
            ];
        }
        else {
            if (isBuyer) {

                rootNavItems = [
                    <HeaderLink key="/postJob" to="/postJob" className="navItemWithSep">Post a Job</HeaderLink>,
                    <HeaderLink key="/browseTalent" to="/browseTalent" className="navItem">Browse Talent</HeaderLink>
                ];
            }
            else    // assumption: only other role is Talent
            {
                rootNavItems = [
                    <HeaderLink key="/browseTalent" to="/browseTalent" className="navItem">Browse Talent</HeaderLink>
                ];
            }
        }

        centerNav = (
            <Nav>
                {adminNavItems}
                {rootNavItems}
            </Nav>
        );

    }
    else // not logged in
    {
        centerNav = (
            <Nav>
                <HeaderLink key="/browseTalent" to="/browseTalent" className="navItemWithSep">Browse Talent (not logged in)</HeaderLink>
                <HeaderLink key="/learnMore" to="/learnMore" className="navItem">Learn More</HeaderLink>
            </Nav>
        );
    }

    return centerNav;
};

HeaderCenterNav.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isBuyer: PropTypes.bool.isRequired
};

export default CSSModules(HeaderCenterNav, styles);
//export default HeaderCenterNav;
