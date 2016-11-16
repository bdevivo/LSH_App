import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap';
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
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row styleName="root">

                    <Col md={12}>

                        <Form horizontal>


                            <FormGroup>

                                <Row>
                                    <Col sm={3} smOffset={1}>
                                        <h4 styleName="subheader">Name</h4>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col sm={3} smOffset={1}>

                                        <FormControl type="text" name="first" defaultValue={firstName}
                                                     placeholder="first name" onChange={updateProfileName}/>
                                    </Col>

                                    <Col sm={3}>
                                        <FormControl type="text" name="middle" defaultValue={middleName}
                                                     placeholder="middle init." onChange={updateProfileName}/>
                                    </Col>

                                    <Col sm={3}>
                                        <FormControl type="text" name="last" defaultValue={lastName}
                                                     placeholder="last name"
                                                     onChange={updateProfileName}/>
                                    </Col>
                                </Row>

                            </FormGroup>

                            <Row>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={3} >
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
                            </Row>


                        </Form>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col md={3} mdOffset={2}>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Col>
                    <Col md={3}>
                        <Button onClick={handleSubmit}>Save</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </div>
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