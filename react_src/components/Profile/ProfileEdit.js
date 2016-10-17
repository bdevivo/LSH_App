import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import AuthService from '../../utils/AuthService';
import {Row, Col, Image, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';

export class ProfileEdit extends React.Component {

   constructor(props, context) {
      super(props, context);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   // method triggered when edit form is submitted
   handleSubmit(e){
      e.preventDefault();
      const { profile, auth } = this.props;
      auth.updateProfile(profile.user_id, {
         user_metadata: {
            address: ReactDOM.findDOMNode(this.refs.address).value // the new address
         }
      });
   }

   render(){
      const { profile } = this.props;
      const { address } = profile.user_metadata || {};
      return (
         <Row styleName="root">
            <Col md={4} mdOffset={6}>
               <h3>Editing Profile</h3>
               <Form horizontal onSubmit={this.handleSubmit}>
                  <FormGroup controlId="address">
                     <Col componentClass={ControlLabel} sm={2}>
                        Address
                     </Col>
                     <Col sm={10}>
                        <FormControl type="text" defaultValue={address} ref="address" />
                     </Col>
                  </FormGroup>
                  <FormGroup>
                     <Col smOffset={2} sm={10}>
                        <Button type="submit">Save</Button>
                     </Col>
                  </FormGroup>
               </Form>
            </Col>
         </Row>
      );
   }
}

ProfileEdit.propTypes = {
   profile: T.object,
   auth: T.instanceOf(AuthService)
};

export default CSSModules(ProfileEdit, styles);
