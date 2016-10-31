import React, {PropTypes as T} from 'react';
import {Row, Col, Image, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './ProfilePage.css';
import FileUpload from './FileUpload';
import AvatarImg from './Avatar';
import 'react-select/dist/react-select.css';
import states from './states';
import { browserHistory } from 'react-router';

const Select = require('react-select');

const access_key = process.env.AWS_ACCESS_KEY_ID;
const secret_key = process.env.AWS_SECRET_ACCESS_KEY;

class ProfileEdit extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    handleCancel()
    {
        localStorage.removeItem('avatarTempData');
        browserHistory.push('/profile');
    }

    render() {
        const {profile, updateProfileAddressField, updateProfileAddressState, updateProfileName, handleSubmit, handleAvatarChange, avatarTimestamp, avatarStorageKey} = this.props;
        const {user_name} = profile;
        let firstName = '', lastName = '', middleName = '';
        if (user_name)
        {
            firstName = user_name.first;
            lastName = user_name.last;
            middleName = user_name.middle;
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

        //debugger;

        let {profilePicture} = profile.user_metadata || {};
        if (!profilePicture)
        {
            let imgPath = 'app_images/avatars/avatar_placeholder.png';
            let bucketName = 'lifescihub';
            profilePicture = `https://s3.amazonaws.com/${bucketName}/${imgPath}`;
        }

        const left_col_wd = 3;
        const right_col_wd = 6;
        const right_col_short_wd = 3;

        return (
            <Row styleName="root">

                <Col md={12}>


                    <Form horizontal>
                        <h4 styleName="subheader">Name</h4>

                        <FormGroup>
                            <Row>

                                <Col sm={3}>
                                    <FormControl type="text" name="first" defaultValue={firstName} placeholder="first name" onChange={updateProfileName} />
                                </Col>

                                <Col sm={3}>
                                    <FormControl type="text" name="middle" defaultValue={middleName} placeholder="middle init." onChange={updateProfileName} />
                                </Col>

                                <Col sm={3}>
                                    <FormControl type="text" name="last" defaultValue={lastName} placeholder="last name" onChange={updateProfileName} />
                                </Col>
                            </Row>


                        </FormGroup>


                        <h4 styleName="subheader">Address</h4>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                Street 1
                            </Col>
                            <Col sm={right_col_wd}>
                                <FormControl type="text" name="street1" defaultValue={street1} onChange={updateProfileAddressField} />
                            </Col>

                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                Street 2
                            </Col>
                            <Col sm={right_col_wd}>
                                <FormControl type="text" name="street2" defaultValue={street2} onChange={updateProfileAddressField} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                City
                            </Col>
                            <Col sm={right_col_wd}>
                                <FormControl type="text" name="city" defaultValue={city} onChange={updateProfileAddressField} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                State
                            </Col>
                            <Col sm={right_col_short_wd}>
                                <Select
                                    name="state"
                                    value={state}
                                    options={states}
                                    clearable={false}
                                    styleName="select"
                                    onChange={updateProfileAddressState}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                ZIP Code
                            </Col>
                            <Col sm={right_col_short_wd}>
                                <FormControl type="text" name="zip" defaultValue={zip} onChange={updateProfileAddressField} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                Country
                            </Col>
                            <Col sm={right_col_short_wd}>
                                <FormControl type="text" name="country" defaultValue={country} onChange={updateProfileAddressField} />
                            </Col>
                        </FormGroup>

                        <h4 styleName="subheader">Avatar</h4>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={left_col_wd}>
                                <AvatarImg storageKey="avatarTempData" url={profilePicture} avatarTimestamp={avatarTimestamp} />
                            </Col>
                            <Col sm={right_col_wd} styleName="fileUploadCol">
                                <FileUpload as="url" name="my-file-input"
                                            onChange={handleAvatarChange}
                                    className="pull-left">
                                    <Button className="pull-left" type="button">Change image...</Button>
                                </FileUpload>
                            </Col>

                        </FormGroup>

                        <FormGroup >
                            <Col smOffset={2} sm={3} styleName="submitButton">
                                <Button onClick={this.handleCancel}>Cancel</Button>
                            </Col>
                            <Col  sm={4} styleName="submitButton">
                                <Button onClick={handleSubmit}>Save</Button>
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
    updateProfileAddressField: T.func.isRequired,
    updateProfileAddressState: T.func.isRequired,
    handleAvatarChange: T.func.isRequired,
    updateProfileName: T.func.isRequired,
    handleSubmit: T.func.isRequired,
    avatarTimestamp: T.string.isRequired,
    avatarStorageKey: T.string.isRequired
};

export default CSSModules(ProfileEdit, styles);
