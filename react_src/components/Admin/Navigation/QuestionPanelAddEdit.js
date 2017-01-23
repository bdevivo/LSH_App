import React, {PropTypes as T} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio, Modal} from 'react-bootstrap';
import styles from './QuestionPanel.css';
import CSSModules from 'react-css-modules';

const classNames = require('classnames');


const QuestionPanelAddEdit = ({qPanel, pageTitle, panelFunctions}) => {

   let {onTextFieldChanged} = panelFunctions;

   return (
      <div>
         <Modal.Header closeButton>
            <Modal.Title>{pageTitle}</Modal.Title>
         </Modal.Header>

         <Modal.Body>

            <Form horizontal styleName="editForm">

               {/* PANEL NAME*/}
               <FormGroup controlId="formControlsQuestionName">
                  <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Name</Col>
                  <Col sm={11} styleName="inlineTextCol">
                     <FormControl name="name" type="text" placeholder="add panel name" value={qPanel.name}
                                  onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                  </Col>
               </FormGroup>

               {/* PANEL HEADER TEXT*/}
               <FormGroup controlId="formControlsQuestionName">
                  <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Name</Col>
                  <Col sm={11} styleName="inlineTextCol">
                     <FormControl name="header" type="text" placeholder="add panel header" value={qPanel.header}
                                  onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                  </Col>
               </FormGroup>

               {/* PANEL SUBHEADER TEXT*/}
               <FormGroup controlId="formControlsQuestionName">
                  <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Name</Col>
                  <Col sm={11} styleName="inlineTextCol">
                     <FormControl name="subHeader" type="text" placeholder="add panel subheader (optional)" value={qPanel.subHeader}
                                  onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                  </Col>
               </FormGroup>

               {/* "NEXT" BUTTON TEXT*/}
               <FormGroup controlId="formControlsQuestionName">
                  <Col componentClass={ControlLabel} styleName="inlineLabel" sm={1}>Name</Col>
                  <Col sm={11} styleName="inlineTextCol">
                     <FormControl name="nextButtonText" type="text" placeholder='add text for "Next" button' value={qPanel.nextButtonText}
                                  onChange={onTextFieldChanged} styleName="inlineTextControl"/>
                  </Col>
               </FormGroup>

             // TODO: add the rest of the form fields

            </Form>

         </Modal.Body>
         <Modal.Footer>
            <Row>
               <Col md={3} mdOffset={2}>
                  <Button onClick={panelFunctions.handleCancel}>Cancel</Button>
               </Col>
               <Col md={3}>
                  <Button onClick={panelFunctions.handleSubmit}>Save</Button>
               </Col>
            </Row>
         </Modal.Footer>
      </div>
   );


};

QuestionPanelAddEdit.propTypes = {
   qPanel: T.object.isRequired,
   pageTitle: T.string.isRequired,
   panelFunctions: T.object.isRequired
};

export default CSSModules(QuestionPanelAddEdit, styles);
