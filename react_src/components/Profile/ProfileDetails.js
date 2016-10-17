import React, { PropTypes } from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';

export class ProfileDetails extends React.Component {

   render(){
      const { profile } = this.props;
      const { address } = profile.user_metadata || {} // new address field

      return (
         <Row>
            <Col md={2}>
               <Image src={profile.picture} circle/>
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

export default ProfileDetails;
