import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const HeaderLinkButton = ({to, children, type}) => {

    let className = "btn btn-xs btn-" + type;   // "type" should be one of the bootstrap button types: primary, success, etc.

    return (
        <LinkContainer to={to}>
            <Button type="button" className={className} styleName="buttonLink">{children}</Button>
        </LinkContainer>
    );
};

HeaderLinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default CSSModules(HeaderLinkButton, styles);