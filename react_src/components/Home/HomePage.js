import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import {Row, Col, Carousel} from 'react-bootstrap';
import FeatureBox from './FeatureBox';
import styles from './HomePage.css';

class HomePage extends Component {
   render() {
      return (
         <div styleName="container">
            <Row>
                <Col md={12}>
                    <Carousel>
                        <Carousel.Item>
                            <div styleName="carouselItemWrapper">
                                <img src="images/stock-photo-assorted-pills-70250746.jpg" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>

             <div className="visible-md visible-lg" styleName="banner">
                 <h2>LifeSciHub: The On-Demand Talent Marketplace for Life Sciences</h2>
             </div>

             <div styleName="featureBoxContainer">
                 <div className="visible-md visible-lg">

                     <div styleName="boxTable">
                         <FeatureBox title="Regulatory" />
                         <FeatureBox title="Pharmacovigilance" />
                         <FeatureBox title="Clinical" />
                         <FeatureBox title="Biostatistics" />
                         <FeatureBox title="IT" />
                     </div>
                 </div>

             </div>

         </div>
      );
   }
}

export default CSSModules(HomePage, styles);
