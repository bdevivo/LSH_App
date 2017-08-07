import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomePage.css';

const HowItWorks = () => {

    return (<div className="container body-content">

        <div className="panel panel-info" styleName="howItWorksPanel">
            <div className="panel-heading">
                <div className="panel-title">
                    How It Works
                </div>
            </div>
            <div className="panel-collapse collapse in" id="first">
                <div className="panel-body">

                    <div className="col-md-6">
                        <img src="images/stock-photo-black-haired-woman-studying-in-the-library-114474988.jpg" alt="1" height="200" />
                    </div>
                    <div className="col-md-6">
                        <h4>[Text to describe how the site works]</h4>
                    </div>
                </div>
            </div>
        </div>

    </div>);
};


export default CSSModules(HowItWorks, styles);
