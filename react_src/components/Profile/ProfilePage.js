import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import {Row, Col, Button} from 'react-bootstrap';
import styles from './ProfilePage.css';

const classNames = require('classnames');


const ProfilePage = ({profile, profileActions, ui, uiActions, addUser, children}) => {

    function createStyleName(path) {
        return classNames({
            'leftNavLink': path !== ui.profile_section,
            'leftNavLinkActive': path === ui.profile_section
        });
    }

    let profileSections = children && React.cloneElement(
            children,
            {
                profile: profile,
                profileActions: profileActions,
                ui: ui,
                uiActions: uiActions
            });

    return (

        <Row>
            <Col md={2} styleName="leftNavCol">
                <Row>
                    <div styleName={createStyleName('account')}><Link to="/profile/account">Account</Link></div>
                    <div styleName={createStyleName('address')}><Link to="/profile/address">Address</Link></div>
                    <div styleName={createStyleName('employment')}><Link to="/profile/employment">Employment</Link></div>
                    <div styleName={createStyleName('education')}><Link to="/profile/education">Education</Link></div>
                    <div styleName={createStyleName('skills')}><Link to="/profile/skills">Skills</Link></div>
                </Row>
            </Col>

            <Col md={10} mdOffset={0} styleName="rightCol">
                <Row>
                    <h3>User Profile</h3>
                    {/*<h4 styleName="subheader">{ui.profile_section_name}</h4>*/}
                    <div styleName="profileSection">
                        {profileSections}
                    </div>
                </Row>

                {/*<Row>*/}
                    {/*<Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={addUser}>*/}
                        {/*Add User*/}
                    {/*</Button>*/}
                {/*</Row>*/}
            </Col>
        </Row>

    );
};


ProfilePage.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
    addUser: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    uiActions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};


export default CSSModules(ProfilePage, styles);
