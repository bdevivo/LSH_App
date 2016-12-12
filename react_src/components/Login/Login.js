import React, { PropTypes as T } from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Login.css';


const classNames = require('classnames');

const Login = ({loginType, handleSubmit, updateLoginField, isLoading}) => {

    function createLoginButtonStyleName() {
        return classNames({
            'disabled': isLoading
        });
    }

    let headerText, buttonText;
    switch(loginType)
    {
        case "default":
            headerText = "Login";
            buttonText = "Login";
            break;

        case "hire":
            headerText = "Sign Up to Hire Resources";
            buttonText = "Sign Up";
            break;

        case "work":
            headerText = "Sign Up to Find Work";
            buttonText = "Sign Up";
            break;

        default:
            headerText = "Login";
            buttonText = "Login";
            break;
    }

    if (isLoading) {    // override the button text when the ajax call is in progress
        buttonText = "Loading...";
    }

    return (
        <div className={styles.root}>
            <h2>{headerText}</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="email">
                    <ControlLabel>E-mail</ControlLabel>
                    <FormControl type="email" name="email" placeholder="yours@example.com" required onChange={updateLoginField} />
                </FormGroup>

                <FormGroup controlId="password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" name="pwd" placeholder="Password" required onChange={updateLoginField} />
                </FormGroup>

                <ButtonToolbar>
                    <Button type="submit" bsStyle="primary" className={createLoginButtonStyleName()}>{buttonText}</Button>
                </ButtonToolbar>
            </Form>
        </div>
    );
};

Login.propTypes = {
    loginType: T.string.isRequired,
    handleSubmit: T.func.isRequired,
    updateLoginField: T.func.isRequired,
    isLoading: T.bool.isRequired,
};

export default CSSModules(Login, styles);