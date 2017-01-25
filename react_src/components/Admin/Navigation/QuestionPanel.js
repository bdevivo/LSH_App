import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './QuestionPanel.css';

const QuestionPanel = ({qPanel}) => {

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

      </Row>
   );
};


QuestionPanel.propTypes = {
   qPanel: PropTypes.object.isRequired
};

export default CSSModules(QuestionPanel, styles);


