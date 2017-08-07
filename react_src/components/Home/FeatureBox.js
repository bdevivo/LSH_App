import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomePage.css';

const FeatureBox = ({title}) => {

    return (<div styleName="boxCell">
                <div className="featureBox" styleName="featureBox">{title}</div>
            </div>);
};

FeatureBox.propTypes = {
    title: PropTypes.string.isRequired
};

export default CSSModules(FeatureBox, styles);
