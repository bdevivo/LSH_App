import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {Row, Col, Image} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';

class ProfileDetails extends React.Component {

    render() {
        const {profile} = this.props;
        let {avatarUrl} = profile;
        if (!avatarUrl)
        {
            let imgPath = 'app_images/avatars/avatar_placeholder.png';
            let bucketName = 'lifescihub';
            avatarUrl = `https://s3.amazonaws.com/${bucketName}/${imgPath}`;
        }

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

        const {user_name} = profile;
        let firstName = '', lastName = '', middleName = '';
        if (user_name)
        {
            firstName = user_name.first;
            lastName = user_name.last;
            middleName = user_name.middle || ' ';
        }

        let userName = (firstName ? `${firstName}${middleName}${lastName}` : "Not Set");

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
            <Row styleName="userProfile">
                <Col md={2}>
                    <Image styleName="avatar" src={avatarUrl} circle/>
                </Col>
                <Col md={6}>
                    <p><strong>Name: </strong> {userName}</p>
                    <p><strong>Email: </strong> {profile.email}</p>
                    <Row>
                        <Col md={2}>
                            <p><strong>Address: </strong></p>
                        </Col>
                        {addressCol}
                    </Row>
                    <Link to="/editprofile">Edit Profile</Link>
                </Col>
            </Row>
        );
    }
}

ProfileDetails.propTypes = {
    profile: PropTypes.object.isRequired
};

export default CSSModules(ProfileDetails, styles);
