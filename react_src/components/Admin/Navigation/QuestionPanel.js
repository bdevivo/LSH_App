import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, ButtonGroup, Modal} from 'react-bootstrap';
import QuestionPanelEditContainer from './QuestionPanelEditContainer';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

const QuestionPanel = ({qPanel, modalVisible, onAddPanelClose}) => {

   let subHeader = <p><b>Header: </b> {qPanel.subHeader}</p>;

   let panel_body =
      (<div>
         <p><b>{qPanel.index}: </b> {qPanel.name}</p>
         <p><b>Header: </b> {qPanel.header}</p>
         {qPanel.subHeader.length > 0 && subHeader}
         <p><b>"Next" button text:</b> {qPanel.nextButtonText}</p>
         // TODO: add the rest of the fields here
      </div>);



   return (

      <Row styleName="questionPanelDiv">

         <Col md={6} styleName="questionPanelBodyDiv">
            { panel_body }
         </Col>

         <Col md={2}>
            <QuestionPanelEditContainer qPanel={qPanel} modalVisible={modalVisible} onAddPanelClose={onAddPanelClose} />
         </Col>

      </Row>
   );
};


QuestionPanel.propTypes = {
   qPanel: PropTypes.object.isRequired,
   modalVisible: PropTypes.bool.isRequired,
   onAddPanelClose: PropTypes.func.isRequired
};

export default CSSModules(QuestionPanel, styles);


