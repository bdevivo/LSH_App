import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Address.css';
import states from './US_States';
import 'react-select/dist/react-select.css';

const Select = require('react-select');

const AddressEdit = ({profile, handleSubmit, handleCancel, updateProfileAddressField, updateProfileAddressState}) => {


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

    const left_col_wd = 3;
    const right_col_wd = 6;
    const right_col_short_wd = 3;

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>

        <Row styleName="root">

            <Col md={12}>

                <Form horizontal>

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

AddressEdit.propTypes = {
    profile: T.object,
    handleSubmit: T.func.isRequired,
    handleCancel: T.func.isRequired,
    updateProfileAddressField:  T.func.isRequired,
    updateProfileAddressState:  T.func.isRequired
};

export default CSSModules(AddressEdit, styles);