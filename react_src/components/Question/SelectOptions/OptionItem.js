import React, {PropTypes as T} from 'react';
import {FormControl, Button, Row, Col} from 'react-bootstrap';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';


const OptionItem = ({item, onEditItem, onDeleteItem}) => {


   return (
      <Row>
         <Col md={1} mdOffset={2}>
            <Button type="button" className="btn btn-sm btn-default" aria-label="Edit" onClick={() => onEditItem(item.id)}>
               <span className="glyphicon glyphicon-pencil"></span>
            </Button>
         </Col>

         <Col md={1}>
            <Button type="button" className="btn btn-sm btn-default" aria-label="Remove" onClick={() => onDeleteItem(item.id)}>
               <span className="glyphicon glyphicon-remove"></span>
            </Button>
         </Col>

         <Col>
               <span className="glyphicon glyphicon-move"></span>
         </Col>

         <Col>
            {item.text}
         </Col>

      </Row>
   );


};

OptionItem.propTypes = {
   item: T.object.isRequired,
   onEditItem: T.func.isRequired,
   onDeleteItem: T.func.isRequired,

};

export default CSSModules(OptionItem, styles);
