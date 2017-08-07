import React from 'react';
import {Nav, Image} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const Logo = () => {

    return <div styleName="logoContainer"><Image styleName="logo" src="images/logo.png"/></div>;
};

export default CSSModules(Logo, styles);
