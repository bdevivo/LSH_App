import React from 'react';
import {Nav, Image} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const Logo = () => {

    return <Nav styleName="logoNav"><Image styleName="logo" src="images/logo.png"/></Nav>;
};

export default CSSModules(Logo, styles);
