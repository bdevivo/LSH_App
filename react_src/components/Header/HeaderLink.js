import React, {PropTypes} from 'react';
import {NavItem, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


const HeaderLink = ({to, children, className}) => {

    return (
        <LinkContainer to={to}>
            <NavItem className={className}>{children}</NavItem>
        </LinkContainer>
    );
};

HeaderLink.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default HeaderLink;