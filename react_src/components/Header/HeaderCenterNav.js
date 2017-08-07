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
                <HeaderLink to="/admin" key="admin" className="navItemWithSep">Admin</HeaderLink>
            ];

            // admin users get all center nav links
            rootNavItems = [
                <HeaderLink to="/jobdash" key="jobdash" className="navItemWithSep">Job Dashboard</HeaderLink>,
                <HeaderLink to="/talentMatches" key="talentMatches" className="navItem">Browse Talent</HeaderLink>
            ];
        }
        else {
            if (isBuyer) {

                rootNavItems = [
                    <HeaderLink to="/jobdash" key="jobdash" className="navItemWithSep">Job Dashboard</HeaderLink>,
                    <HeaderLink key="/talentMatches" to="/talentMatches" className="navItem">Browse Talent</HeaderLink>
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
            <div styleName="centerNav">
                <Nav bsStyle="pills" styleName="centerNav">
                    {adminNavItems}
                    {rootNavItems}
                </Nav>
            </div>
        );

    }
    else // not logged in
    {
        centerNav = (
            <div styleName="centerNav">
                <Nav className="navbar-nav">
                    <HeaderLink key="/talentMatches" to="/talentMatches" className="navItemWithSep">Browse Talent (not logged in)</HeaderLink>
                    <HeaderLink key="/learnMore" to="/learnMore" className="navItem">Learn More</HeaderLink>
                </Nav>
            </div>
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
