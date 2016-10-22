import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {Row, Col, Image} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';

class ProfileDetails extends React.Component {

    render() {
        const {profile} = this.props;
        const {user_metadata} = profile;
        let {profilePicture} = user_metadata || {};
        //debugger;
        if (!profilePicture)
        {
            let imgPath = 'app_images/avatars/avatar_placeholder.png';
            let bucketName = 'lifescihub';
            profilePicture = `https://s3.amazonaws.com/${bucketName}/${imgPath}`;
        }
        const {address} = user_metadata || {};

        let userName = (user_metadata.firstName ? `${user_metadata.firstName} ${user_metadata.lastName}` : "Not Set");

        let addressCol;
        if (address.street1)
        {
            addressCol = (
                <Col md={8}>
                    <p>{address.street1}</p>
                    <p>{address.street2}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
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
                    <Image styleName="avatar" src={profilePicture} circle/>
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
    auth: PropTypes.instanceOf(AuthService),
    profile: PropTypes.object.isRequired
};

export default CSSModules(ProfileDetails, styles);
