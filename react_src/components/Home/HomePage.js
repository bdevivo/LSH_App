import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import {Row, Col, Carousel} from 'react-bootstrap';
import FeatureBox from './FeatureBox';
import HowItWorks from './HowItWorks';
import styles from './HomePage.css';

class HomePage extends Component {
   render() {
      return (
         <div styleName="homeContainer">
            <Row>
                <Col md={12}>
                    <Carousel interval={10000}>
                        <Carousel.Item>
                            <div styleName="carouselItemWrapper">
                                <img src="images/stock-photo-assorted-pills-70250746.jpg" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div styleName="carouselItemWrapper">
                                <img src="images/stock-photo-researcher-is-dropping-the-reagent-into-test-tube-with-chemical-equations-background-in-laboratory-236819650.jpg" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div styleName="carouselItemWrapper">
                                <img src="images/stock-photo-modern-business-workplace-with-tablet-laptop-and-some-papers-with-charts-graphs-and-numbers-on-a-218096314.jpg" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div styleName="carouselItemWrapper">
                                <img src="images/stock-photo-pill-bottle-and-prescription-concept-for-healthcare-and-medicine-97588826.jpg" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div styleName="carouselItemWrapper">
                                <img src="images/pexels-photo-263370.jpeg" />
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

            <HowItWorks />

         </div>
      );
   }
}

export default CSSModules(HomePage, styles);
