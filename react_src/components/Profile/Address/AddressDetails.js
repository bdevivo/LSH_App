import React, {PropTypes} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Address.css';


const AddressDetails = ({profile, enterProfileEditMode}) => {

    const {address} = profile;
    let street1 = '', street2 = '', city = '', state = '', country = '', zip = '';
    if (address)
    {
        street1 = address.street1;
        street2 = address.street2;
        city = address.city;
        state = address.state;
        country = address.country;
        zip = address.zip;
    }

    let addressCol;
    if (address.street1)
    {
        addressCol = (
            <Col md={8}>
                <p>{street1}</p>
                <p>{street2}</p>
                <p>{city}, {state} {zip}</p>
            </Col>);
    }
    else {
        addressCol = (
            <Col md={8}>
                <p>Not Set</p>
            </Col>);
    }


    return (
        <div>
            <Row styleName="userProfile">
                <Col md={2}>
                    <p><strong>Address: </strong></p>
                </Col>
                {addressCol}
            </Row>

            <Row>
                <a href="#" onClick={enterProfileEditMode}>Edit</a>
            </Row>
        </div>
    );

};

AddressDetails.propTypes = {
    profile: PropTypes.object.isRequired,
    enterProfileEditMode: PropTypes.func.isRequired
};

export default CSSModules(AddressDetails, styles);
