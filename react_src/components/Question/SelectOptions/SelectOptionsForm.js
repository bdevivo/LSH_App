import React, {PropTypes as T} from 'react';
import {FormControl, Button, Row, Col} from 'react-bootstrap';
import OptionItemContainer from './OptionItemContainer';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';

const SelectOptionsForm = ({options, onAddOptionTextChange, onAddItem, onDeleteItem, onEditItemSave}) => {

   let optionItemList = options.map(item => <OptionItemContainer
      optionItem={item}
      key={item.index}
      onDeleteItem={onDeleteItem}
      onEditItemSave={onEditItemSave} />);


   return (
      <div>
         <h2>Options</h2>

         <Row>
            <Col>
               <FormControl className="textarea" placeholder="Add option text" onChange={onAddOptionTextChange}/>
            </Col>
            <Col>
               <Button onClick={onAddItem}>Add</Button>
            </Col>
         </Row>

         {optionItemList}

      </div>
   );


};

SelectOptionsForm.propTypes = {
   options: T.array.isRequired,
   onAddOptionTextChange: T.func.isRequired,
   onAddItem: T.func.isRequired,
   onDeleteItem: T.func.isRequired,
   onEditItemSave: T.func.isRequired
};

export default CSSModules(SelectOptionsForm, styles);
