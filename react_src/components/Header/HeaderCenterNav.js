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
                <HeaderLink to="/admin" key="admin" className="navItem">Admin</HeaderLink>
            ];

            // admin users get all center nav links
            rootNavItems = [
                <HeaderLink to="/jobdash" key="jobdash" className="navItem">Job Dashboard</HeaderLink>,
                <HeaderLink to="/browseJobs" key="browseJobs" className="navItem">Browse Jobs</HeaderLink>,
                <HeaderLink to="/browseTalent" key="browseTalent" className="navItem">Browse Talent</HeaderLink>
            ];
        }
        else {
            if (isBuyer) {

                rootNavItems = [
                    <HeaderLink to="/jobdash" key="jobdash" className="navItemWithSep">Job Dashboard</HeaderLink>,
                    <HeaderLink key="/browseTalent" to="/browseTalent" className="navItem">Browse Talent</HeaderLink>
                ];
            }
            else    // assumption: only other role is Talent
            {
                rootNavItems = [
                    <HeaderLink key="/browseJobs" to="/browseJobs" className="navItem">Browse Jobs</HeaderLink>
                ];
            }
        }

        centerNav = (
            <Nav bsStyle="pills" styleName="centerNav">
                {adminNavItems}
                {rootNavItems}
            </Nav>
        );

    }
    else // not logged in
    {
        centerNav = (
            <Nav styleName="centerNav">
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
