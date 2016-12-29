import React, {PropTypes as T} from 'react';
import {FormControl, Button, Row, Col} from 'react-bootstrap';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';


const OptionItemEdit = ({item, onEditItemTextChange, onSave, onCancel}) => {


   return (
      <Row>
         <Col>
            <FormControl className="textarea" value={item.text} onChange={onEditItemTextChange}/>
         </Col>

         <Col md={1} mdOffset={2}>
            <Button type="button" className="btn btn-sm btn-default" aria-label="Save" onClick={onSave}>
               Save
            </Button>
         </Col>

         <Col md={1}>
            <Button type="button" className="btn btn-sm btn-default" aria-label="Cancel" onClick={onCancel}>
               Cancel
            </Button>
         </Col>

      </Row>
   );


};

OptionItemEdit.propTypes = {
   item: T.object.isRequired,
   onEditItemTextChange: T.func.isRequired,
   onSave: T.func.isRequired,
   onCancel: T.func.isRequired
};

export default CSSModules(OptionItemEdit, styles);
