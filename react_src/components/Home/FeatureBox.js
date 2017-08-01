import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomePage.css';

const FeatureBox = ({title}) => {

    let styleName = "featureBox";

    function onMouseEnter() {
        styleName = "featureBoxHover";
    }

    function onMouseLeave() {
        styleName = "featureBox";
    }

    function getStyle()
    {
        return styleName;
    }

    return (<div styleName="boxCell">
                <div className="featureBox" styleName={getStyle()} onMouseOver={onMouseEnter} onmouseleave={onMouseLeave}>{title}</div>
            </div>);
};

FeatureBox.propTypes = {
    title: PropTypes.string.isRequired
};

export default CSSModules(FeatureBox, styles);
