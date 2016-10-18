import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import AuthService from '../../utils/AuthService';
import {Row, Col, Image, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';
//import FileReaderInput from 'react-file-reader-input';
import FileUpload from './FileUpload';
import AWS from 'aws-sdk';

const access_key = process.env.AWS_ACCESS_KEY_ID;
const secret_key = process.env.AWS_SECRET_ACCESS_KEY;

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

   handleFileUpload(event, results) {

      //console.log('Selected file:', event.target.files[0]);
      results.forEach(result => {
         const [e, file] = result;
         //debugger;
         //this.props.dispatch(uploadFile(e.target.result));
         //console.log(`Successfully uploaded ${file.name}!`);

         // configure AWS client
         //AWS.config.loadFromPath('../../../awsconfig.json');
         let access_key = process.env.AWS_ACCESS_KEY_ID;
         let secret_key = process.env.AWS_SECRET_ACCESS_KEY;
         AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY}
            );

         // Create an S3 client
         let s3 = new AWS.S3();

         //upload file to AWS bucket
         let bucketName = 'lifescihub';
         let keyName = `app_images/${file.name}`;

         s3.createBucket({Bucket: bucketName}, function() {
            let params = {Bucket: bucketName, Key: keyName, Body: e.target.result};
            s3.putObject(params, function(err, data) {
               if (err)
                  console.log(err);
               else
                  console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
            });
         });

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

                  <FormGroup controlId="imageUpload">
                     <Col componentClass={ControlLabel} sm={2}>
                        Upload Profile Image
                     </Col>
                     <Col sm={10}>
                        <FileUpload as="binary" id="my-file-input"
                                         onChange={this.handleFileUpload}>
                           <button>Select a file!</button>
                        </FileUpload>
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
