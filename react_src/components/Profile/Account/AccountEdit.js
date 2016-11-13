import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Account.css';
import FileUpload from './FileUpload';
import AvatarImg from './Avatar';
import 'react-select/dist/react-select.css';

const AccountEdit = ({profile, updateProfileName, handleSubmit, handleCancel, handleAvatarChange, avatarTimestamp}) => {

    const {user_name} = profile;
    let firstName = '', lastName = '', middleName = '';
    if (user_name) {
        firstName = user_name.first;
        lastName = user_name.last;
        middleName = user_name.middle;
    }

    let {avatarUrl} = profile || {};
    if (!avatarUrl) {
        let imgPath = 'app_images/avatars/avatar_placeholder.png';
        let bucketName = 'lifescihub';
        avatarUrl = `https://s3.amazonaws.com/${bucketName}/${imgPath}`;
    }

    const left_col_wd = 3;
    const right_col_wd = 6;

    return (
        <Row styleName="root">

            <Col md={12}>

                <Form horizontal>
                    <h4 styleName="subheader">Name</h4>

                    <FormGroup>
                        <Row>

                            <Col sm={3}>
                                <FormControl type="text" name="first" defaultValue={firstName}
                                             placeholder="first name" onChange={updateProfileName}/>
                            </Col>

                            <Col sm={3}>
                                <FormControl type="text" name="middle" defaultValue={middleName}
                                             placeholder="middle init." onChange={updateProfileName}/>
                            </Col>

                            <Col sm={3}>
                                <FormControl type="text" name="last" defaultValue={lastName} placeholder="last name"
                                             onChange={updateProfileName}/>
                            </Col>
                        </Row>

                    </FormGroup>

                    <h4 styleName="subheader">Avatar</h4>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={left_col_wd}>
                            <AvatarImg storageKey="avatarTempData" url={avatarUrl}
                                       avatarTimestamp={avatarTimestamp}/>
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
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Col>
                        <Col sm={4} styleName="submitButton">
                            <Button onClick={handleSubmit}>Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );


};

AccountEdit.propTypes = {
    profile: T.object,
    handleAvatarChange: T.func.isRequired,
    updateProfileName: T.func.isRequired,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    avatarTimestamp: T.string.isRequired
};

export default CSSModules(AccountEdit, styles);