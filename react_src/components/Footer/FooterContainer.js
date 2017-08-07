import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import styles from './Footer.css';


class FooterContainer extends React.Component {

    getYear() {
        let today = new Date();
        return today.getFullYear();
    }

    render() {

        return (

            <Row styleName="footerContainer">
                <Col>

                    <footer>

                        <Col lg={2} lgOffset={2} md={2} mdOffset={2}>


                            <p styleName="footerHeader">About Us</p>

                            <hr/>

                            <ul styleName="footerList">
                                <li><Link to="/about/team">Management Team</Link></li>
                                <li><Link to="/about/contact">Contact Us</Link></li>
                            </ul>
                        </Col>


                        <Col lg={2} lgOffset={6} md={2} mdOffset={6}>
                            <p>&copy; {this.getYear()} - LifeSciHub</p>
                        </Col>

                    </footer>
                </Col>
            </Row>



        );
    }
}

export default CSSModules(FooterContainer, styles);



