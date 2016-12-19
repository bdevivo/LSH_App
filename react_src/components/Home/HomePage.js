import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import {Row, Col} from 'react-bootstrap';
import styles from './HomePage.css';

class HomePage extends Component {
   render() {
      return (
         <div styleName="container">
            <h1>LifeSciHub</h1>
            <p>The On-Demand Talent Marketplace for Life Sciences</p>
         </div>
      );
   }
}

export default CSSModules(HomePage, styles);
