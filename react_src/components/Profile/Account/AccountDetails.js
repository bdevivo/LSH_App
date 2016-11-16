import React, {PropTypes} from 'react';
import {Row, Col, Image, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Account.css';


const AccountDetails = ({profile, enterAccountEditMode}) => {

    let {avatarUrl} = profile;
    if (!avatarUrl)
    {
        let imgPath = 'app_images/avatars/avatar_placeholder.png';
        let bucketName = 'lifescihub';
        avatarUrl = `https://s3.amazonaws.com/${bucketName}/${imgPath}`;
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


    return (
        <Row styleName="userProfile">
            <Col md={2}>
                <Image styleName="avatar" src={avatarUrl} circle/>
            </Col>
            <Col md={6}>
                <p><strong>Name: </strong> {userName}</p>
                <p><strong>Email: </strong> {profile.email}</p>

                <Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={enterAccountEditMode}>
                    <span className="glyphicon glyphicon-pencil"></span>
                </Button>
            </Col>
        </Row>
    );
    
};

AccountDetails.propTypes = {
    profile: PropTypes.object.isRequired,
    enterAccountEditMode: PropTypes.func.isRequired
};

export default CSSModules(AccountDetails, styles);
