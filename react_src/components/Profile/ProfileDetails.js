import React, { PropTypes } from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';

export class ProfileDetails extends React.Component {

   render(){
      const { profile } = this.props;
      const { address } = profile.user_metadata || {}; // new address field
      const { profilePicture } = profile.user_metadata || {};

      return (
         <Row>
            <Col md={2}>
               <Image styleName="avatar" src={profilePicture} circle />
            </Col>
            <Col md={6}>
               <p><strong>Name: </strong> {profile.name}</p>
               <p><strong>Email: </strong> {profile.email}</p>
               <p><strong>Nickname: </strong> {profile.nickname}</p>
               <p><strong>Address: </strong> {address}</p>
               <p><strong>Created At: </strong> {profile.created_at}</p>
               <p><strong>Updated At: </strong> {profile.updated_at}</p>
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
