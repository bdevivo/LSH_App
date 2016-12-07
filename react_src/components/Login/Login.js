import React, { PropTypes as T } from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './Login.css';

const classNames = require('classnames');

const Login = ({title, handleSubmit, updateLoginField, buttonText, loading}) => {

   function createLoginButtonStyleName() {
      return classNames({
         'disabled': loading
      });
   }

    return (
        <div className={styles.root}>
            <h2>{title}</h2>
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
    title: T.string.isRequired,
    handleSubmit: T.func.isRequired,
    updateLoginField: T.func.isRequired,
   buttonText: T.string.isRequired,
   loading: T.bool.isRequired,

};

export default CSSModules(Login, styles);
