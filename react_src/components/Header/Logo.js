import React from 'react';
import {Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const Logo = () => {

    return <div styleName="logoContainer"><LinkContainer to="/"><Image styleName="logo" src="images/logo.png"/></LinkContainer></div>;
};

export default CSSModules(Logo, styles);
